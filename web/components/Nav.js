import Link from 'next/link'

const Nav = () => {
	return (
		<nav className='navbar'>
			<div className='navbar__logo'>
				<Link href='/'>
					<img src='/shop-of-silver_liggande.svg' />
				</Link>
			</div>
			<Link href='/products'>Products</Link>
		</nav>
	)
}

export default Nav