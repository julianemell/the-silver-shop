import { createClient } from 'next-sanity'
import ProductCard from '../../components/ProductCard';

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
})

export async function getStaticProps() {
	const products = await client.fetch(`*[_type == "product"]`);

	return {
		props: {
			products
		}
	};
}

const Products = ({ products }) => {
	return (
		<div>
			{products.length > 0 && (
				<ul>
					{products.map(product => (
						<ProductCard key={product._id} product={product} />
					))}
				</ul>
			)}
			{!products.length > 0 && <p>No products to show</p>}
		</div>
	)
}

export default Products