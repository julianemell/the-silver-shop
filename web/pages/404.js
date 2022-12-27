import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NotFound = () => {
	const router = useRouter()

	//redirect to the homepage in 3 seconds
	useEffect(() => {
		setTimeout(() => {
			router.push('/') 
		}, 3000)
	}, [])

	return (
		<div>
			<h1>That page cannot be found</h1>
			<p>You are being redirected to the <Link href='/'>homepage</Link>.</p>
		</div>
	)
}

export default NotFound