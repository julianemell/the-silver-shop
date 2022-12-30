import Layout from '../components/Layout'
import '../styles/main.scss'
import CartContextProvider from '../context/CartContextProvider'

function App({ Component, pageProps }) {

	return (
		<CartContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</CartContextProvider>
	)
}

export default App
