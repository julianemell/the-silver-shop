import { useEffect } from 'react'
import { useRouter } from 'next/router'

const canceled = () => {
	const router = useRouter()

	//redirect to the homepage in 3 seconds
	useEffect(() => {
		setTimeout(() => {
			router.push('/products') 
		}, 3000)
	}, [])

	return (
		<div className='order__canceled'>
			<p>No order has gone through</p>
			<p>You are being redirected to the products page</p>
		</div>
	)
}

export default canceled