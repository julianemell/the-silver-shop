import Head from 'next/head'
import Nav from "./Nav"
import Footer from "./Footer"

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>Julias Shop of Silver</title>
			</Head>

			<div className='content'>
				<Nav />
				{ children }
				<Footer />
			</div>
		</>
	)
}

export default Layout