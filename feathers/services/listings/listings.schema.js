module.exports = {
	type: 'object',
	properties: {
		id: {
			type: 'string'
		},
		title: {
			type: 'string'
		},
		notes: {
			type: 'string'
		},
		contact: {
			type: 'object',
			properties: {
				phone: {
					type: 'string',
					pattern: '\\+\\d{11}$'
				},
				email: {
					type: 'string',
					format: 'email'
				},
				name: {
					type: 'string'
				}
			}
		},
		details: {
			type: 'object',
			properties: {
				miles: {
					type: 'number'
				},
				make: {
					type: 'string'
				},
				model: {
					type: 'string'
				},
				year: {
					type: 'number',
					minimum: 2010 // Current year is 2017, only 7 years old.
				},
				price: {
					type: 'number'
				},
				condition: {
					type: 'string'
				}
			}
		},
		craigslistListing: {
			type: 'object'
		},
		flags: {
			type: 'array',
			items: {
				enum: ['contacted', 'replied', 'sold', 'ignore']
			}
		}
	},
	required: []
};
