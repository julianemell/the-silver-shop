// schemas/about.js

export default {
	name: 'about',		// Required. The field name, and key in the data record
	type: 'document',	// Required. The name of any valid schema type.
	title: 'About',		// The human-readable label. Used in the studio.
	// Input fields below, as many as you need.
	fields: [
		{
			title: 'About Heading',
			name: 'aboutHeading',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			title: 'About Text',
			name: 'aboutText',
			type: 'array',
			of: [{ type: 'block' }],
			validation: Rule => Rule.required(),
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			fields: [
				{
					title: 'Attribution',
					name: 'attribution',
					type: 'string',
					description: 'alt-text - description of the picture',
				},
			],
		},
	]
}