import Link from 'next/link'

const ProductCard = ({ product }) => {
	return (
		<li key={product._id}>
			<Link href={`/products/${product._id}`}>{product?.name}</Link>
			<p>{product._id}</p>
		</li>
	)
}

export default ProductCard