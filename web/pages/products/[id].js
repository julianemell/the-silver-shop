import { client } from '../../library/client'

const Details = ({ product }) => {
	const productDetails = product[0]

	return (
		<>
			<h1>Details</h1>
			{productDetails && (
				<p>{productDetails.name}</p>
			)}
		</>
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