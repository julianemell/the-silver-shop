import ShoppingCartItem from './ShoppingCartItem'
import { useShoppingCart } from '../context/CartContextProvider'
import { useEffect, useState } from 'react'
import { client } from '../library/client'
import Link from 'next/link'

const ShoppingCart = () => {
	const [allProducts, setAllProducts] = useState([])

	const { 
		closeCart,
		cartItems,
		isOpen,
		cartQuantity,
	} = useShoppingCart()

	const handleChangeStockLevel = async () => {
		closeCart()
		
		try {
			await fetch('/api/mutateProducts', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cartItems),
			})

		} catch (err) {
			console.log('error', err.message)
		}
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
							<Link href='/checkout'>
								<button 
									className='button button--secondary'
									onClick={() => {handleChangeStockLevel()}}
									aria-controls='shoppingcart-items'
									aria-expanded='false'
									data-visible={isOpen}
								>Go to checkout</button>
							</Link>
						</div>
					</div>
				}
			</div>
		</>
	)
}

export default ShoppingCart