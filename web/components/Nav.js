import Link from 'next/link'
import { useShoppingCart } from '../context/CartContextProvider'

const Nav = () => {
	const { openCart, closeCart, cartQuantity, isOpen } = useShoppingCart()
	
	return (
		<nav className='navbar'>
			<div className='navbar__logo'>
				<Link href='/'>
					<img src='/shop-of-silver_liggande.svg' />
				</Link>
			</div>
			{cartQuantity >= 1 && 
				<div 
					className='cart' 
					onClick={openCart}
					aria-controls="shoppingcart-items"
					aria-expanded='false'
					data-visible={isOpen}
				>
					<img src='/cart.svg' />
					<div className='cart--amount'>
						<p className='cart--amount__number'>{cartQuantity}</p>
					</div>
				</div>
			}
		</nav>
	)
}

export default Nav