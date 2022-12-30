import { useContext, createContext, useState } from 'react'

export const CartContext = createContext({})

export const useShoppingCart = () => {
	return useContext(CartContext)
}

const CartContextProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([])
	
	const getItemQuantity = (id) => {
		console.log('cartItems get item quantity', cartItems)
		if(cartItems.find(item => item.id === id)){
			return + 1
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
	}

	return (
		<CartContext.Provider value={values}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContextProvider