import { createClient } from 'next-sanity'

const client = createClient({
	projectId: 'fmf3b9s8',
	dataset: 'production'
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
					{products.map((product) => (
					<li key={product._id}>{product?.name}</li>
					))}
				</ul>
			)}
			{!products.length > 0 && <p>No products to show</p>}
		</div>
	)
}

export default Products