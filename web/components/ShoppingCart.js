import { useShoppingCart } from '../context/CartContextProvider'

const ShoppingCart = () => {
	const { closeCart } = useShoppingCart()

	return (
		<div>ShoppingCart</div>
	)
}

export default ShoppingCart