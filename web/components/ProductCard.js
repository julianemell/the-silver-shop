import { urlFor } from '../library/client'
import Link from 'next/link'

const ProductCard = ({ product }) => {
	console.log('product', product)
	return (
		<Link className='product__card' href={`/products/${product._id}`} key={product._id}>
			
				{product.images?.map(image => (
					<img key={image?.asset._ref} src={urlFor(image).url()} alt='' width='200' className='product__image' />
				))}
				<h2>{product?.name}</h2>
				<p>{product.productCost} kr</p>
			
		</Link>
	)
}

export default ProductCard