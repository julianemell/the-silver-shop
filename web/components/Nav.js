import Link from 'next/link'
import { useShoppingCart } from '../context/CartContextProvider'

const Nav = () => {
	const { openCart, cartQuantity } = useShoppingCart()

	return (
		<nav className='navbar'>
			<div className='navbar__logo'>
				<Link href='/'>
					<img src='/shop-of-silver_liggande.svg' />
				</Link>
			</div>
			{cartQuantity && 
				<div className='cart' onClick={openCart}>
					<img src='/cart.svg' />
					<div className='cart--amount'>
						<p>{cartQuantity}</p>
					</div>
				</div>
			}
		</nav>
	)
}

export default Nav