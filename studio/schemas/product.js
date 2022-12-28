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
			validation: Rule => Rule.required(),
		},
		{
			title: 'Slug',
			name: 'productSlug',
			type: 'slug',
			description: 'This will be the url for the product',
			options: {
				source: doc => `${doc.name}-${doc.productCode}`,
				slugify: input => input
					.toLowerCase()
					.replace(/\s+/g, '-')
					.slice(0, 200)
					.replace('ö', 'o')
					.replace('å', 'a')
					.replace('ä', 'a')
			},
			validation: Rule => Rule.required(),
		},
		{
			title: 'Product Code',
			name: 'productCode',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Product Description',
			name: 'productDescription',
			type: 'text',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Images',
			name: 'images',
			type: 'array',
			of: [{ type: 'image' }],
			validation: Rule => Rule.required(),
		},
		{
			title: 'Product Cost',
			name: 'productCost',
			type: 'number',
			validation: Rule => Rule.required(),
		},
		
	]
}