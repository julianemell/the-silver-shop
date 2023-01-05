import { useShoppingCart } from '../context/CartContextProvider'
import { urlFor } from '../library/client'

const ShoppingCartItem = ({ product, allProducts }) => {
	
	const productInCart = allProducts.find(i => i._id === product.id)
	
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
	} = useShoppingCart()

	const quantity = getItemQuantity(product.id)

	const totCost = (cost, amount) => {
		return cost * amount
	}


	return (
		<div className='shoppingcart-item'>
			{productInCart && 
				<p>{productInCart.name}</p>
				
			}
			{productInCart && productInCart.images.map(image => (
				<img key={image?.asset._ref} src={urlFor(image).url()} alt='' width='100' />
			))}
			<span className='shoppingcart--add-remove'>
				<div className='product--amount'>
					<button className='product--amount-change' onClick={() => decreaseCartQuantity(product.id)}>-</button>
					<span>{quantity}</span>
					<button className='product--amount-change' onClick={() => increaseCartQuantity(product.id)}>+</button>
				</div>
				{productInCart && (
					<p>{totCost(productInCart.productCost, quantity)} kr</p>
				)}
				<button className='shoppingcart--remove' onClick={() => removeFromCart(product.id)}></button>
			</span>
		</div>
	)
}

export default ShoppingCartItem