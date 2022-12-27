import Link from 'next/link'

const ProductCard = ({ product }) => {
	return (
		<li key={product._id}>
			<Link href={`/products/${product._id}`}>{product?.name}</Link>
		</li>
	)
}

export default ProductCard