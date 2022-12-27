import Layout from '../components/Layout'
import '../styles/main.scss'

function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default App
