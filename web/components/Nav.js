import Link from 'next/link'

const Nav = () => {
	return (
		<nav className='navbar'>
			<div className='navbar__logo'>
				<Link href='/'>
					<img src='/shop-of-silver_liggande.svg' />
				</Link>
			</div>
			<div className='cart'>
				<img src='/cart.svg' />
				<div className='cart--amount'>
					<p>8</p>
				</div>
			</div>
		</nav>
	)
}

export default Nav