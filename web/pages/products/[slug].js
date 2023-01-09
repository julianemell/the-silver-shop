import Link from 'next/link'
import { useShoppingCart } from '../../context/CartContextProvider'
import { client, urlFor } from '../../library/client'

const Details = ({ product }) => {
	const { images, _id, name, productDescription, productCost } = product
	
	const { 
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
	} = useShoppingCart()

	const quantity = getItemQuantity(_id)

	return (
		<div className='product'>
			<span className='product__links'>
				<Link href='/'>Home</Link> / <Link href='/products'>Products</Link> / <span>{name}</span>
			</span>

			{product && (
				<>
					{images?.map(image => (
						<img key={image?.asset._ref} src={urlFor(image).url()} alt='' width='400' />
					))}
					<h2>{name}</h2>
					<p>{productDescription}</p>
					<p>{productCost} kr</p>
				</>
			)}
			<div>
				{product && quantity === 0 ? (
					<button className='button button--primary' onClick={() => increaseCartQuantity(_id)}>Add to cart</button>
				) : (
					<div className='product--amount'>
						<button className='product--amount-change' onClick={() => decreaseCartQuantity(_id)}>-</button>
						<span>{quantity}</span>
						<button className='product--amount-change' onClick={() => increaseCartQuantity(_id)}>+</button>
					</div>
				)}
			</div>
		</div>
	)
}

// fetch all the products
export const getStaticPaths = async () => {
	const products = await client.fetch(`*[_type == "product"]` )

	const paths = products.map(product => {
		return {
			params: { slug: product.productSlug.current }
		}
	})

	return {
		paths,
		fallback: false,
	}
}

// for each product getStaticProps
// the slug is in the context object
export const getStaticProps = async (context) => {
	const product = await client.fetch(`*[_type == "product" && productSlug.current == $slug][0]`, {
		slug: context.params.slug
	})

	return {
		props: {
			product
		}
	}

}

export default Details