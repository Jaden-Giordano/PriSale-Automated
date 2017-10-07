// Initializes the `listings` service on path `/listings`
const createService = require('feathers-rethinkdb');
const hooks = require('./listings.hooks');
const filters = require('./listings.filters');

const craigslist = require('./listings.craigslist');

const timeToUpdate = '8:00';

module.exports = function () {
	const app = this;
	const Model = app.get('rethinkdbClient');
	const paginate = app.get('paginate');

	const options = {
		name: 'listings',
		Model,
		paginate
	};

	// Initialize our service with any options it requires
	app.use('/listings', createService(options));

	// Get our initialized service so that we can register hooks and filters
	const service = app.service('listings');

	service.hooks(hooks);

	if (service.filter) {
		service.filter(filters);
	}

	let splitTime = timeToUpdate.split(':');
	// Every day at 8am queries are made to craigslist and service is updated with new listings.
	function loop() {
		let now = new Date();
		let delay = 60000 - (now % 60000);

		// eslint-disable-next-line no-console
		console.log(now.getHours() + ':' + now.getMinutes() + ' | ' + ~~splitTime[0] + ':' + ~~splitTime[1]);
		if (now.getHours() === ~~splitTime[0] && now.getMinutes() === ~~splitTime[1])
			craigslist(app);

		setTimeout(loop, delay);
	}

	loop();
};
