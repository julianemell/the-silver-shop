import { useShoppingCart } from '../context/CartContextProvider'

const ShoppingCart = () => {
	const { closeCart, cartItems, isOpen } = useShoppingCart()
	console.log('cartItems i shoppingcart', cartItems)

	return (
		<div className='shoppingcart'>
				<div className='shoppingcart-items' data-visible={isOpen}>
					<button 
						className='shoppingcart--close'
						onClick={closeCart}
						aria-controls="shoppingcart-items"
						aria-expanded='false'
						data-visible={isOpen}
					></button>
					{cartItems && cartItems.map(item => (
						<div className='shoppingcart-item'>
							<p>{item.id} / {item.quantity}</p>
						</div>
					))}
					<div>
						<button className='button button--secondary'>Go to checkout</button>
					</div>
				</div>
			
		</div>
	)
}



export default ShoppingCart