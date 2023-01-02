import { useShoppingCart } from '../context/CartContextProvider'

const ShoppingCart = () => {
	const { 
		closeCart,
		cartItems,
		isOpen,
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		cartQuantity,
		removeFromCart,
	} = useShoppingCart()

	let productQuantity = getItemQuantity()

	return (
		<div className='shoppingcart'>
			{cartQuantity >= 1 && isOpen == true &&
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
							<p>{item.id}</p>
							<span className='shoppingcart--add-remove'>
								<div className='product--amount'>
									<button className='product--amount-change' onClick={() => decreaseCartQuantity(item.id)}>-</button>
									<span>{item.quantity}</span>
									<button className='product--amount-change' onClick={() => increaseCartQuantity(item.id)}>+</button>
								</div>
								<button className='shoppingcart--remove' onClick={() => removeFromCart(item.id)}></button>
							</span>
						</div>
					))}
					<div>
						<p>{cartQuantity}</p>
						<button className='button button--secondary'>Go to checkout</button>
					</div>
				</div>
			}
		</div>
	)
}



export default ShoppingCart