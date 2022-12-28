import Link from 'next/link'
import { client, urlFor } from '../../library/client'

const Details = ({ product }) => {
	const productDetails = product[0]
	console.log('productDetails', productDetails)

	return (
		<div className='product'>
			<span className='product__links'>
				<Link href='/'>Home</Link> / <Link href='/products'>Products</Link> / <span>{productDetails.name}</span>
			</span>

			{productDetails && (
				<>
					{productDetails.images?.map(image => (
						<img key={image?.asset._ref} src={urlFor(image).url()} alt='' width='400' />
						))}
					<h2>{productDetails.name}</h2>
					<p>{productDetails.productDescription}</p>
					<p>{productDetails.productCost} kr</p>

					<button className='button button--primary'>Add to cart</button>
				</>
			)}
		</div>
	)
}

// fetch all the products
export const getStaticPaths = async () => {
	const products = await client.fetch(`*[_type == "product"]`)

	const paths = products.map(product => {
		return {
			params: { id: product._id.toString() }
		}
	})

	return {
		paths,
		fallback: false,
	}
}

// for each product getStaticProps
// the id is in the context object
export const getStaticProps = async (context) => {
	const product = await client.fetch(`*[_type == "product" && _id == $_id]`, {
		_id: context.params.id
	})

	return {
		props: {
			product
		}
	}

}

export default Details