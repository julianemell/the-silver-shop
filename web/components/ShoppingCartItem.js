import { useShoppingCart } from '../context/CartContextProvider'
import { urlFor } from '../library/client'

const ShoppingCartItem = ({ product, allProducts }) => {
	const productInCart = allProducts.find(i => i._id === product.id)
	
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
		stockMessage,
	} = useShoppingCart()

	const quantity = getItemQuantity(product.id)

	const totCost = (cost, amount) => {
		return cost * amount
	}

	return (
		<div className='shoppingcart-item'>
			{productInCart && (
				<>
					<div className='shoppingcart-item__img-name-price'>
						<span className='shoppingcart-item__img'>
							{productInCart.images && 
								<img 
									key={productInCart.images[0].asset._ref}
									src={urlFor(productInCart.images[0]).url()}
									alt=''
									width='50'
								/>
							}
						</span>
						<p>{productInCart.name}</p>
						<p className='shoppingcart-item__price'>{totCost(productInCart.productCost, quantity)} kr</p>
					</div>
					
					<span className='shoppingcart--add-remove'>
						<div className='product--amount'>
							<button className='product--amount-change' onClick={() => decreaseCartQuantity(product.id)}>-</button>
							<span>{quantity}</span>
							<button className='product--amount-change' onClick={() => increaseCartQuantity(product.id, product, (quantity + 1))}>+</button>
						</div>
						<button className='shoppingcart--remove' onClick={() => removeFromCart(product.id)}></button>
					</span>

					{product.message !== '' && <p className='stocklevel-message'>{product.message}</p>}
				</>
			)}
		</div>
	)
}

export default ShoppingCartItem