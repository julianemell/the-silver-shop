import ShoppingCartItem from './ShoppingCartItem'
import { useShoppingCart } from '../context/CartContextProvider'
import { useEffect, useState } from 'react'
import { client } from '../library/client'

const ShoppingCart = () => {
	const [allProducts, setAllProducts] = useState([])
	const [totPrice, setTotPrice] = useState(0)

	const { 
		closeCart,
		cartItems,
		isOpen,
		cartQuantity,
	} = useShoppingCart()

	const totalPrice = () => {
		
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
						<ShoppingCartItem key={item.id} product={item} allProducts={allProducts} />
					))}

					<div>
						<p>
							Total: {cartItems.reduce((total, cartItem) => {
								const productInCart = allProducts.find(i => i._id === cartItem.id)
								return total + (productInCart?.productCost || 0) * cartItem.quantity
							}, 0)} kr
						</p>
						<button className='button button--secondary'>Go to checkout</button>
					</div>
					<p></p>
				</div>
			}
		</div>
	)
}

export default ShoppingCart