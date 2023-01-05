import { useContext, createContext, useState, useEffect } from 'react'
import ShoppingCart from '../components/ShoppingCart'

export const CartContext = createContext({})

export const useShoppingCart = () => {
	return useContext(CartContext)
}

const CartContextProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])

	// counts all the item quantities in the cart and adds the quantity
	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0 //default value
	)

	const openCart = () => setIsOpen(true)
	const closeCart = () => setIsOpen(false)
	
	const getItemQuantity = (id) => {
		if(cartItems.find(item => item.id === id)){
			let cartProduct = cartItems.find(item => item.id === id)
			return cartProduct.quantity
		} else {
			return 0
		}
	}

	const increaseCartQuantity = (id) => {
		setCartItems(currentItems => {
			if(currentItems.find(item => item.id === id) == null) {
				return [...currentItems, { id, quantity: 1 }]
			} else {
				return currentItems.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1}
					} else {
						return item
					}
				})
			}
		})
	}

	const decreaseCartQuantity = (id) => {
		setCartItems(currentItems => {
			if(currentItems.find(item => item.id === id)?.quantity === 1) {
				return currentItems.filter(item => item.id !== id)
			} else {
				return currentItems.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1}
					} else {
						return item
					}
				})
			}
		})
	}

	const removeFromCart = (id) => {
		setCartItems(currentItems => {
			return currentItems.filter(item => item.id !== id)
		})
	}

	const values = {
		getItemQuantity, 
		increaseCartQuantity, 
		decreaseCartQuantity, 
		removeFromCart,
		cartItems,
		cartQuantity,
		openCart,
		closeCart,
		isOpen,
	}

	//fetch from localStorage
	useEffect(() => {
		const localStorageCartItems = localStorage.getItem('shopping-cart')

		const storedShoppingItems = localStorageCartItems
			? JSON.parse(localStorageCartItems)
			: []
		
		setCartItems(storedShoppingItems)
	}, [])

	//store in localStorage
	useEffect(() => {
		if (cartItems.length > 0 ) {
			localStorage.setItem('shopping-cart', JSON.stringify(cartItems))
		}
	}, [cartItems])

	return (
		<CartContext.Provider value={values}>
			{children}
			<ShoppingCart />
		</CartContext.Provider>
	)
}

export default CartContextProvider