import { useEffect, useState } from 'react'
import ShoppingCartItem from '../../components/ShoppingCartItem'
import { useShoppingCart } from '../../context/CartContextProvider'
import { client } from '../../library/client'
//import Link from 'next/link'
import { useForm } from 'react-hook-form'
const short = require('short-uuid')

const Checkout = () => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm()
	const [allProducts, setAllProducts] = useState([])
	const [order, setOrder] = useState([])
	const [totalCost, setTotalCost] = useState(null)

	const { 
		cartItems,
	} = useShoppingCart()

	// get the date and time of when the order is placed
	const orderTime = new Date().toLocaleString()

	// fetch the products in the carts name and the quantity
	const orderedItems = cartItems.map(product => {
			return { _key: short.generate(), name: product.name, quantity: product.quantity }
		}
	)

	const onSubmit = async (data) => {
		const { name, streetAddress, streetAddress2, postCode, city, email } = data

		const orderInfo = {
			orderNumber: short.generate(),
			products: orderedItems,
			totalPrice: totalCost,
			name: name, 
			streetAddress: streetAddress,
			streetAddress2: streetAddress2,
			postCode: postCode, 
			city: city,
			email: email,
			orderDate: orderTime,
		}

		setOrder(orderInfo)

		console.log('order', order)

		//reset()
	}

	const handleCheckout = async () => {
		try {
			await fetch('/api/order', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(order),
			})

		} catch (err) {
			console.log('error', err.message)
		}
	}

	useEffect(() => {
		setTotalCost(cartItems.reduce((total, cartItem) => {
			const productInCart = allProducts.find(i => i._id === cartItem.id)
			return total + (productInCart?.productCost || 0) * cartItem.quantity
		}, 0))
	}, [orderedItems])

	useEffect(() => {
		const getProducts = async () => {
			await client
				.fetch(`*[_type == "product"]`)
				.then(product => setAllProducts(product))
		}
		getProducts()
	}, [])

	return (
		<div>
			<h1>Overview</h1>
			{cartItems && cartItems.map(item => (
				<ShoppingCartItem key={item.id} product={item} allProducts={allProducts} />
			))}
			<div>
				<p>Total: {totalCost} kr</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<input 
					{...register('name', {
						required: true,
					})}
					type='text'
					id='name'
					placeholder='Your full name'
				/>
				<input 
					{...register('streetAddress', {
						required: true,
					})}
					type='text'
					id='address-street'
					placeholder='street 1'
				/>
				<input 
					{...register('streetAddress2', {
						required: true,
					})}
					type='text'
					id='address-street2'
					placeholder='apartment 1'
				/>
				<input 
					{...register('postCode', {
						required: true,
					})}
					type='text'
					id='postcode'
					placeholder='post code'
				/>
				<input 
					{...register('city', {
						required: true,
					})}
					type='text'
					id='city'
					placeholder='city'
				/>
				<input 
					{...register('email', {
						required: true,
					})}
					type='email'
					id='email'
					placeholder='email'
				/>
				
				<button type='submit' className='button button--secondary'>Order summary</button>
			</form>
				<button className='button button--secondary' onClick={() => handleCheckout()}>go to payment</button>
		</div>
	)
}

export default Checkout