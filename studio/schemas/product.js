// schemas/product.js

export default {
	name: 'product',	// Required. The field name, and key in the data record
	type: 'document',	// Required. The name of any valid schema type.
	title: 'Product',	// The human-readable label. Used in the studio.
	// Input fields below, as many as you need.
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Images',
			name: 'images',
			type: 'array',
			of: [{ type: 'image' }],
			validation: Rule => Rule.required(),
		},
	]
}