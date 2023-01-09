const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
	if(req.method === 'POST') {
		try {
			const params = {
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_options: [
					{ shipping_rate: 'shr_1MOM6DE8h0qJ6VtiyBRcqUnB' }, // standard shipping
					{ shipping_rate: 'shr_1MOM7CE8h0qJ6VtijUC78WZ4' }, //fast shipping
				],
				line_items: [
					{
					// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
					price: '{{PRICE_ID}}',
					quantity: 1,
					},
				],
				mode: 'payment',
				success_url: `${req.headers.origin}/?success=true`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
				}
				// Create Checkout Sessions from body params.
				const session = await stripe.checkout.sessions.create(params)
				res.redirect(303, session.url);

		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	}
}