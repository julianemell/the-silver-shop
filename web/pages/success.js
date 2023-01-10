import { useEffect } from 'react'
import Link from 'next/link'
import { useShoppingCart } from '../context/CartContextProvider'

const success = () => {
	const { setCartItems } = useShoppingCart()

	useEffect(() => {
		localStorage.clear()
		setCartItems([])
	}, [])

	return (
		<div className=''>
			<h2>Thank you for your order!</h2>
			<p>Check your email for the order confirmation</p>
			<p>If you have any questions please email: 
				<a href='mailto:order@juliasshopofsilver.com'> order@juliasshopofsilver.com</a>
			</p>
			<Link href='/'>
				<button className='button button--primary'>
					Continue shopping
				</button>
			</Link>
		</div>
	)
}

export default success