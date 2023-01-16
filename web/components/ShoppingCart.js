import ShoppingCartItem from './ShoppingCartItem'
import { useShoppingCart } from '../context/CartContextProvider'
import { useEffect, useState } from 'react'
import { client } from '../library/client'
import getStripe from '../library/getStripe'

const ShoppingCart = () => {
	const [allProducts, setAllProducts] = useState([])

	const { 
		closeCart,
		cartItems,
		isOpen,
		cartQuantity,
	} = useShoppingCart()
	
	const handleCheckOut = async () => {
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

	useEffect(() => {
		const getProducts = async () => {
			await client
				.fetch(`*[_type == "product"]`)
				.then(product => setAllProducts(product))
		}
		
		getProducts()
	}, [])

	return (
		<>
			<span 
				className='shoppingcart__bg' 
				onClick={closeCart} 
				data-visible={isOpen}
			></span>

			<div className='shoppingcart'>
				{cartQuantity >= 1 && isOpen == true &&
					<div className='shoppingcart-items' data-visible={isOpen}>
						<button 
							className='shoppingcart--close'
							onClick={closeCart}
							aria-controls='shoppingcart-items'
							aria-expanded='false'
							data-visible={isOpen}
						></button>

						{cartItems && cartItems.map(item => (
							<ShoppingCartItem key={item.id} product={item} allProducts={allProducts} />
						))}

						<div>
							<p className='cartitems__total-price'>
								Total: {cartItems.reduce((total, cartItem) => {
									const productInCart = allProducts.find(i => i._id === cartItem.id)
									return total + (productInCart?.productCost || 0) * cartItem.quantity
								}, 0)} kr
							</p>
							<button 
								className='button button--secondary'
								onClick={() => handleCheckOut()}
							>Go to checkout</button>
						</div>
						<p></p>
					</div>
				}
			</div>
		</>
	)
}

export default ShoppingCart