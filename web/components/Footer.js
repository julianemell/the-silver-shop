import Link from "next/link"

const Footer = () => {
	return (
		//<footer className='footer'>Copyright ® Julias Shop of Silver 2023</footer>
		<nav className='nav-footer'>
			<Link href='/products' className='nav-footer__item nav-footer__item-shop'>
				<div>
					Shop
				</div>
			</Link>
			<Link href='/about' className='nav-footer__item nav-footer__item-about'>
				<div>
					About
				</div>
			</Link>
			<Link href='https://www.instagram.com/julias-shop-of-silver' className='nav-footer__item nav-footer__item-social'>
				<div>
					instagram
				</div>
			</Link>
			<Link href='#' className='nav-footer__item nav-footer__item-mail'>
				<div>
					mailing list
				</div>
			</Link>
		</nav>
	)
}

export default Footer