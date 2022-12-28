import ProductCard from '../../components/ProductCard';
import { client } from '../../library/client'

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

export const getServerSideProps = async () => {
	const products = await client.fetch(`*[_type == "product"]`)

	return {
		props: {
			products
		}
	}
}

export default Products