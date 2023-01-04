import Link from 'next/link'
import { useShoppingCart } from '../../context/CartContextProvider'
import { client, urlFor } from '../../library/client'

const Details = ({ product }) => {
	const productDetails = product[0]

	const { 
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
	} = useShoppingCart()

	const quantity = getItemQuantity(productDetails._id)

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
				</>
			)}
			<div>
				{productDetails && quantity === 0 ? (
					<button className='button button--primary' onClick={() => increaseCartQuantity(productDetails._id)}>Add to cart</button>
				) : (
					<div className='product--amount'>
						<button className='product--amount-change' onClick={() => decreaseCartQuantity(productDetails._id)}>-</button>
						<span>{quantity}</span>
						<button className='product--amount-change' onClick={() => increaseCartQuantity(productDetails._id)}>+</button>
					</div>
				)}
			</div>
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