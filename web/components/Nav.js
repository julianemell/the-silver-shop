import Link from 'next/link'

const Nav = () => {
	return (
		<nav className='navbar'>
			<div>
				<Link href='/'>Julias Shop of Silver</Link>
			</div>
			<Link href='/products'>Products</Link>
		</nav>
	)
}

export default Nav