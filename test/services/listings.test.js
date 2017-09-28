const assert = require('assert');
const should = require('should'); // eslint-disable-line no-unused-vars

const _ = require('lodash');
const {
	info,
	warn
} = require('winston');

const app = require('../../feathers/app');

const validListing = {
	title: 'Selling a car',
	notes: 'This person is hard to handle, but the car is really solid',
	contact: {
		name: 'Bob Builder',
		email: 'bobnotthebuilder@gmail.com',
		phone: '+16789875903'
	},
	details: {
		miles: 16000,
		make: 'Chevy',
		model: 'Cruz',
		year: 2015,
		price: 16000,
		condition: 'like new'
	},
	flags: ['contacted', 'replied']
};
const invalidListing = _.cloneDeep(validListing);
invalidListing.contact.phone = 878;
invalidListing.flags.push('invalidEnum');
invalidListing.details.miles = 'string?';

// May take to execute because it creates a listing then later removes it
async function createTmpListing() {
	warn('This test may take longer to execute due to awaiting results from api requests.');

	const service = app.service('listings');

	const tmpListing = await service.create(validListing);
	info('Created temporary listing for later finding.');

	return tmpListing;
}

function removeTmpListing(tmpListing) {
	const service = app.service('listings');

	if (tmpListing && tmpListing.id) {
		info('Removing temporary listing.');
		service.remove(tmpListing.id).then(() => {
			info('Removed temporary listing.');
		});
	}
}

describe('\'listings\' service', () => {
	const service = app.service('listings');

	it('registered the service', () => {
		assert.ok(service, 'Registered the service');
	});

	describe('create \'listings\'', () => {
		// May take longer to execute because record must be deleted after it is created.
		it('created a valid listing', async() => {
			warn('This test may take longer to execute due to awaiting results from api requests.');

			const result = await service.create(validListing);
			result.should.have.property('id');

			if (result && result.id) {
				info('Removing \'listing\' created.');
				service.remove(result.id).then(() => {
					info('Successfully removed \'listing\'.');
				});
			}
		});

		it('failed to create an invalid listing', () => {
			service.create(invalidListing).then(() => {}, () => {
				return false;
			}).should.eventually.not.be.ok();
		});
	});

	describe('find \'listings\'', () => {
		it('got an array of listings', () => {
			service.find().should.eventually.have.property('data').and.be.a.Array();
		});

		it('found a specific listing', () => {
			const tmpListing = createTmpListing();

			if (tmpListing && tmpListing.id)
				service.get(tmpListing.id).should.eventually.be.ok();

			removeTmpListing(tmpListing);
		});

		it('failed to find non existant listing', () => {
			service.get('non-existant').then(() => {}, () => {
				return false;
			}).should.eventually.not.be.ok();
		});
	});

	describe('update \'listings\'', () => {
		it('updated an existing listing with valid data', () => {
			const tmpListing = createTmpListing();

			const updatedListing = _.clone(validListing);
			updatedListing.miles = 12000;
			updatedListing.title = 'Car for sale only 12000 miles';

			service.update(tmpListing.id, updatedListing).should.eventually.be.ok();

			removeTmpListing(tmpListing);
		});

		it('failed to update an existing listing with invaild data', () => {
			const tmpListing = createTmpListing();

			service.update(tmpListing.id, invalidListing).then(() => {}, () => {
				return false;
			}).should.eventually.not.be.ok();

			removeTmpListing(tmpListing);
		});
	});

	describe('remove \'listings\'', () => {
		it('removed an existant listing', () => {
			const tmpListing = createTmpListing();

			service.remove(tmpListing.id).should.eventually.be.ok();

			removeTmpListing(tmpListing);
		});

		it('failed to remove a non-existant listing', () => {
			service.remove('non-existant').then(() => {}, () => {
				return false;
			}).should.eventually.not.be.ok();
		});
	});
});
