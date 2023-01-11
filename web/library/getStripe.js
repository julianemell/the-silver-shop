import { loadStripe } from '@stripe/stripe-js'

let stripePromise
const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`

const getStripe = () => {
	if(!stripePromise) {
		stripePromise = loadStripe(apiKey)
	}

	return stripePromise
}

export default getStripe