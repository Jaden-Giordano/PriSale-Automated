const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;
const restrict = [
	restrictToOwner({
		idField: 'id',
		ownerField: 'id'
	})
];

module.exports = {
	before: {
		all: [ authenticate('jwt') ],
		find: [],
		get: [ ...restrict ],
		create: [ hashPassword() ],
		update: [ ...restrict, hashPassword() ],
		patch: [ ...restrict, hashPassword() ],
		remove: [ ...restrict ]
	},

	after: {
		all: [
			commonHooks.when(
				hook => hook.params.provider,
				commonHooks.discard('password')
			)
		],
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
