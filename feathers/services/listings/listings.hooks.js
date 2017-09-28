const { authenticate } = require('feathers-authentication').hooks;
const validateSchema = require('feathers-hooks-common').validateSchema;

const ajv = require('ajv');
const listingSchema = require('./listings.schema');

module.exports = {
	before: {
		all: [ authenticate('jwt') ],
		find: [],
		get: [],
		create: [ validateSchema(listingSchema, ajv) ],
		update: [ validateSchema(listingSchema, ajv) ],
		patch: [ validateSchema(listingSchema, ajv) ],
		remove: []
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
