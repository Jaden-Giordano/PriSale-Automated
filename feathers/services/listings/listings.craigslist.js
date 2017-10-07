const craigslist = require('node-craigslist');

const { info, error } = require('winston');
const { green, red } = require('chalk');

const client = new craigslist.Client({
	city: 'atlanta'
});

const search_options = {
	category: 'cto',
	postal: '30188',
	searchDistance: 50,
	bundleDuplicate: true
};

function query() {
	return new Promise((resolve, reject) => {
		client.search(search_options).then((res) => {
			const search = res;
			for (let i = 0; i < res.length; i++)
				if (search[i].url.match(/https:\/\/atlanta\.craigslist\.org/g).length > 1)
					search[i].url = search[i].url.replace(/https:\/\/atlanta\.craigslist\.org/, '');

			return resolve(search);
		}, (err) => reject(err) );
	});
}

function createDBObject(listing) {
	const formattedPrice = ~~listing.price.replace('$', '');

	let dbObject = {
		id: listing.pid,
		title: listing.title,
		location: listing.location,
		details: {
			price: formattedPrice
		},
		craigslistListing: listing
	};

	let make = false, model = false, year = false, miles = false;

	if (make) dbObject.details.make = make;
	if (model) dbObject.details.model = model;
	if (year) dbObject.details.year = year;
	if (miles) dbObject.details.miles = miles;

	return dbObject;
}

function delay(millis) {
	return new Promise(resolve => setTimeout(resolve, millis));
}

module.exports = async (app) => {
	info(green('It\'s 8:00am! Time to update the database!'));

	const results = await query().then(() => {}, err => {
		error(red(err));
		return false;
	});

	if (results) {
		const listings_service = app.service('listings');

		for (let i = 0; i < results.length; i++) {
			let listing = results[i];

			// If database already contains listings ignore it.
			if (await listings_service.get(listing.id)) continue;


			// eslint-disable-next-line no-unused-vars
			const dbObject = createDBObject(listing);

			await delay(2000);
		}

	}
};
