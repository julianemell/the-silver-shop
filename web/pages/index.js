import styles from '../styles/Home.module.css'
import { createClient } from 'next-sanity'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Home({ products }) {
	return (
		<>
			<Nav />
			<main className={styles.main}>
				{products.length > 0 && (
					<ul>
						{products.map((product) => (
						<li key={product._id}>{product?.name}</li>
						))}
					</ul>
				)}
				{!products.length > 0 && <p>No products to show</p>}
			</main>
			<Footer />
		</>
	)
}

const client = createClient({
	projectId: 'fmf3b9s8',
	dataset: 'production'
})

export async function getStaticProps() {
	const products = [
		{
			_id: '21f420e9-342e-435a-97ef-92b06c56cbf4',
			_rev: '85ofytkbziCzpRlLHFEgG4',
			_type: 'product',
			name: 'Earrings',
			_createdAt: '2022-12-22T11:15:08.828968046Z',
			_updatedAt: '2022-12-22T11:15:08.885Z'
		} 
	];

	return {
		props: {
			products
		}
	};
}
