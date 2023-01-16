import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '../../components/ProductCard'
import { useShoppingCart } from '../../context/CartContextProvider'
import { client, urlFor } from '../../library/client'

const Details = ({ product, products }) => {
	const [imageIndex, setImageIndex] = useState(0)
	const { images, _id, name, productDescription, productCost } = product

	const { 
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
	} = useShoppingCart()

	const quantity = getItemQuantity(_id)

	return (
		<div className='product-page'>
			<div className='product-details'>
				<span className='product__links'>
					<Link href='/'>Home</Link> / <Link href='/products'>Products</Link> / <span>{name}</span>
				</span>

				{product && (
					<>
						{images &&
							<img 
								key={images[imageIndex].asset._ref} 
								src={urlFor(images[imageIndex]).url()} 
								alt='' 
								className='product__image'
							/>
						}
					
						<div className='product__images-container'>
							{product.images?.map((image, i) => (
								<img 
									key={image?.asset._ref} 
									src={urlFor(image).url()} 
									alt='' 
									width='50' 
									className='product__images-container-image' 
									onMouseEnter={() => setImageIndex(i)}
								/>
							))}
						</div>
						<h2>{name}</h2>
						<p>{productDescription}</p>
						<p>{productCost} kr</p>
					</>
				)}
				<div>
					{product && quantity === 0 ? (
						<button className='button button--primary' onClick={() => increaseCartQuantity(_id, product, (quantity + 1))}>Add to cart</button>
					) : (
						<div className='product--amount'>
							<button className='product--amount-change' onClick={() => decreaseCartQuantity(_id, product)}>-</button>
							<span>{quantity}</span>
							<button className='product--amount-change' onClick={() => increaseCartQuantity(_id, product, (quantity + 1))}>+</button>
						</div>
					)}
				</div>
			</div>

			<div>
				<h3>You may also like:</h3>
				<div className='products__marquee'>
					{products && products.map(item => (
						<ProductCard key={item._id} product={item} />
					))}
				</div>
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
	const products = await client.fetch(`*[_type == "product"]`)

	return {
		props: {
			product,
			products
		}
	}

}

export default Details