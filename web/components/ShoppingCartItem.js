import { useShoppingCart } from '../context/CartContextProvider'

const ShoppingCartItem = ({ product }) => {
	const {
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
	} = useShoppingCart()

	return (
		<div className='shoppingcart-item'>
			<p>{product.id}</p>
			<span className='shoppingcart--add-remove'>
				<div className='product--amount'>
					<button className='product--amount-change' onClick={() => decreaseCartQuantity(product.id)}>-</button>
					<span>{product.quantity}</span>
					<button className='product--amount-change' onClick={() => increaseCartQuantity(product.id)}>+</button>
				</div>
				<button className='shoppingcart--remove' onClick={() => removeFromCart(product.id)}></button>
			</span>
		</div>
	)
}

export default ShoppingCartItem