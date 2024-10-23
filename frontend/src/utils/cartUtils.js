// Remove decimals if using CFA Francs (XAF)
export const addDecimals = (num) => {
  // If dealing with currencies that don't support decimals, return the integer value
  if (num % 1 === 0) {
    return num.toString() // No decimals
  }
  return (Math.round(num * 100) / 100).toFixed(2) // Default to 2 decimals if applicable
}

export const updateCart = (state) => {
  // Calculate items price (assuming it's already in integers if dealing with CFA Francs)
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  // Calculate shipping price (set shipping fee based on conditions)
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10

  // Tax calculation (without decimals if using CFA)
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice))

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(0) // Ensure no decimals if currency doesn't support it

  // Save to localStorage (optional)
  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
