// schemas/order.js

export default {
	name: 'orders',		// Required. The field name, and key in the data record
	type: 'document',	// Required. The name of any valid schema type.
	title: 'Orders',		// The human-readable label. Used in the studio.
	// Input fields below, as many as you need.
	fields: [
		{
			title: 'Order number',
			name: 'orderNumber',
			type: 'string',
		},
		{
			title: 'Products',
			name: 'products',
			type: 'array',
			of: [{ 
				type: 'object', 
				name: 'inline', 
				fields: [
					{ 
						type: 'string', 
						name: 'name' 
					}, 
					{ 
						type: 'number', 
						name: 'quantity' 
					}
				]
			}]
		},
		{
			title: 'Total price',
			name: 'totalPrice',
			type: 'number',
		},
		{ 
			title: 'Name',
			name: 'name', 
			type: 'string', 
		},
		{ 
			title: 'Address 1',
			name: 'address1', 
			type: 'string', 
		},
		{ 
			title: 'Address 2',
			name: 'address2', 
			type: 'string', 
		},
		{ 
			title: 'Post code',
			name: 'postCode', 
			type: 'string', 
		},
		{ 
			title: 'City',
			name: 'city', 
			type: 'string', 
		},
		{
			title: 'Customers e-mail',
			name: 'email',
			type: 'string',
		},
		{
			title: 'Order date',
			name: 'orderDate',
			type: 'datetime',
		},
		{
			title: 'Sent',
			name: 'sent',
			type: 'boolean',
			description: 'Check this box when the order has been sent',
		},
	]
}