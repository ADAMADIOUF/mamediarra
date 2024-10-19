import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(true) // Manage modal state
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const closeModal = () => {
    setIsModalOpen(false) // Close modal function
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div className='cart-screen'>
      <h1 className='cart-title'>Shopping Cart</h1>  

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty. <Link to={`/shop`}>Go Back</Link>
        </Message>
      ) : (
        <div className='cart-items'>
          {cartItems.map((item) => (
            <div className='cart-item' key={item._id}>
              <img
                className='cart-item-image'
                src={item.images[0]}
                alt={item.name}
              />
              <Link className='cart-item-name' to={`/product/${item._id}`}>
                {item.name}
              </Link>
              <div className='cart-item-price'>{item.price} CFA</div>
              <select
                className='cart-item-qty'
                value={item.qty}
                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button
                className='cart-item-remove'
                onClick={() => removeFromCartHandler(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className='cart-summary'>
        <h2>
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <div className='cart-total'>
          $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </div>
        <button
          className='checkout-button'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  )
}

export default CartScreen
