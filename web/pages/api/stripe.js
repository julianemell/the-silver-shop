import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

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
				line_items: req.body.map(item => {
					const img = item.images[0].asset._ref
					const newImage = img.replace('image-', 'https://cdn.sanity.io/images/fmf3b9s8/production/').replace('-webp', '.webp').replace('-jpg', '.jpg')

					return {
						price_data: {
							currency: 'sek',
							product_data: {
								name: item.name,
								images: [newImage],
							},
							unit_amount: item.productCost * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},
						quantity: item.quantity,
					}
				}),
				success_url: `${req.headers.origin}/?success=true`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
				}
				// Create Checkout Sessions from body params.
				const session = await stripe.checkout.sessions.create(params)
				res.status(200).json(session)

		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	}
}