import { useEffect, useState } from 'react'
import ShoppingCartItem from '../../components/ShoppingCartItem'
import { useShoppingCart } from '../../context/CartContextProvider'
import { client } from '../../library/client'
import Link from 'next/link'

const Checkout = () => {
	const [allProducts, setAllProducts] = useState([])

	const { 
		cartItems,
	} = useShoppingCart()

	
	useEffect(() => {
		const getProducts = async () => {
			await client
				.fetch(`*[_type == "product"]`)
				.then(product => setAllProducts(product))
		}
		
		getProducts()
	}, [])

	return (
		<div>
			<h1>Overview</h1>
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
				{/*<Link href={`/checkout/${id}`}>*/}
					<button className='button button--secondary'>Go to checkout</button>
				{/*</Link>*/}
			</div>
		</div>
	)
}

export default Checkout