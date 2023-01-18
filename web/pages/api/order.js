import { client } from '../../library/client'

export default async function createOrder(req, res) {
	const { orderNumber, products, totalPrice, name, streetAddress, streetAddress2, postCode, city, email, orderDate } = req.body

	console.log('body', req.body)

	try {
		client
			.create({
				_type: 'orders',
				orderNumber: orderNumber,
				products: products,
				totalPrice: totalPrice,
				name: name,
				address1: streetAddress,
				address2: streetAddress2,
				postCode: postCode,
				city: city,
				email: email,
				orderDate: orderDate,
				sent: false,
			})
			.then((orderCreated) =>
				console.log('Order is created', orderCreated._id)
			)
	} catch (err) {
		console.error('Det gick inte att skapa order: ', err.message)
		return res.status(500).json({ message: `Couldn't create order`, err })
	} finally {
		return res.status(200).json({ message: `Order created!` })
	}
}