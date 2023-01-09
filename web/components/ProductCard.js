import { urlFor } from '../library/client'
import Link from 'next/link'

const ProductCard = ({ product }) => {
	
	return (
		<Link className='product__card' href={`/products/${product.productSlug.current}`} key={product._id}>
			
				{product.images && 
					<img key={product.images[0].asset._ref} src={urlFor(product.images[0]).url()} alt='' width='200' className='product__image' />
				}
				<h2>{product?.name}</h2>
				<p>{product.productCost} kr</p>
			
		</Link>
	)
}

export default ProductCard