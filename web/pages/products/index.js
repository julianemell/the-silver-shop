import ProductCard from '../../components/ProductCard';
import { client } from '../../library/client'
import Link from 'next/link'
import 'animate.css'

const Products = ({ products }) => {
	return (
		<>
			<span className='product__links'>
				<Link href='/'>Home</Link> / <span>Products</span>
			</span>

			<div className='products animate__animated animate__fadeInLeft animate__fast'>
				{products.length > 0 && (
					<>
						{products.map(product => (
							<ProductCard key={product._id} product={product} />
						))}
					</>
				)}
				{!products.length > 0 && <p>No products to show</p>}
			</div>
		</>
	)
}

export const getServerSideProps = async () => {
	const products = await client.fetch(`*[_type == "product"]`)

	return {
		props: {
			products
		},
		revalidate: 10,
	}
}

export default Products