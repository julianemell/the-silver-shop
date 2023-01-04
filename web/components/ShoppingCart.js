import ShoppingCartItem from './ShoppingCartItem'
import { useShoppingCart } from '../context/CartContextProvider'

const ShoppingCart = () => {
	const { 
		closeCart,
		cartItems,
		isOpen,
		cartQuantity,
	} = useShoppingCart()

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
						<ShoppingCartItem key={item.id} product={item} />
					))}

					<div>
						<p>Total number of products: {cartQuantity} pcs</p>
						<button className='button button--secondary'>Go to checkout</button>
					</div>
				</div>
			}
		</div>
	)
}

export default ShoppingCart