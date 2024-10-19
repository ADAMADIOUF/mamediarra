import { createSlice } from '@reduxjs/toolkit'

// Helper function to get cart items from localStorage
const getCartItemsFromStorage = () => {
  const cartItems = localStorage.getItem('cartItems')
  return cartItems ? JSON.parse(cartItems) : []
}

// Helper function to set cart items in localStorage
const setCartItemsToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

// Helper function to add decimals
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

// Helper function to update cart prices and persist to localStorage
export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  // Calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

  // Calculate tax price (15% tax rate in this example)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2)

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state))

  return state
}

// Initial state
const initialState = {
  cartItems: getCartItemsFromStorage(),
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
}

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        state.cartItems.push(item)
      }

      // Update the cart (recalculate prices) and persist to localStorage
      updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

      // Update the cart (recalculate prices) and persist to localStorage
      updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    clearCartItems: (state) => {
      state.cartItems = []

      // Clear cart in localStorage and reset prices
      localStorage.removeItem('cartItems')
      state.itemsPrice = 0
      state.shippingPrice = 0
      state.taxPrice = 0
      state.totalPrice = 0
    },
  },
})

// Export the actions
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions

// Export the reducer
export default cartSlice.reducer
