import getStripe from '../library/getStripe'
import { useShoppingCart } from '../context/CartContextProvider'

const OrderSummary = ({ order }) => {
	console.log('order', order)
	const { products, totalPrice, name, streetAddress, streetAddress2, postCode, city, email, orderDate } = order

	const { 
		cartItems,
	} = useShoppingCart()

	const handleCheckout = async () => {
		try {
			await fetch('/api/order', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(order),
			})

		} catch (err) {
			console.log('error', err.message)
		}
	}


	const handlePayment = async () => {
		const stripe = await getStripe()

		//här kan vi ev använda axios istället
		const res = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		})

		if(res.statusCode === 500) return
		
		const data = await res.json()

		stripe.redirectToCheckout({ sessionId: data.id })
	}

	return (
		<div className='ordersummary'>
			<div className='order-content'>
				<h1>Order summary</h1>
				{order && (
					<>
						<p>Order placed: {orderDate}</p>
						<div className='ordersummary-address'>
							<p>{name}</p>
							<p>{streetAddress}</p>
							{streetAddress2 && (
								<p>{streetAddress2}</p>
							)}
							<p>{postCode}, {city}</p>
							<p>{email}</p>
						</div>
						<div className='ordersummary-product'>
							{products && products.map(product => (
								<p>{product.quantity} pcs - {product.name}</p>
							))}
							<p className='ordersummary-total'>Total cost: {totalPrice} kr</p>
						</div>
					</>
				)}
				<button className='button button--secondary' onClick={() => {handlePayment(); handleCheckout()}}>Go to payment</button>
			</div>
		</div>
	)
}

export default OrderSummary