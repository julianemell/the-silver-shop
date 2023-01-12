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
			of: [
				{
					type: 'block', 
					styles: [
						{title: 'Normal', value: 'normal'},
						{title: 'H2', value: 'h2'},
						{title: 'H3', value: 'h3'},
						{title: 'Quote', value: 'blockquote'},
					], 
					marks: { 
						decorators: [
							{title: 'Strong', value: 'strong'},
							{title: 'Emphasis', value: 'em'},
							{title: 'Underline', value: 'underline'},
						],
						annotations: [
							{
								title: 'External link',
								name: 'link',
								type: 'object',
								fields: [
									{
										title: 'URL',
										name: 'href',
										type: 'url',
									}
								]
							}
						],
					}, 
					lists: [
						{title: 'Bullet', value: 'bullet'},
						{title: 'Numbered', value: 'number'},
					] 
				}
			],
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