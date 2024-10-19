import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const ModalCartScreen = ({ closeModal }) => {
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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
    closeModal() // Close the modal after proceeding to checkout
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
              <article>
                {' '}
                <img
                  className='cart-item-image'
                  src={item.images[0]}
                  alt={item.name}
                />
              </article>
              <article>
                <Link className='cart-item-name' to={`/product/${item._id}`}>
                  {item.name.substring(0, 20)}
                </Link>
                <div className='cart-item-price'>{item.price} CFA</div>
                <select
                  className='cart-item-qty'
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </article>
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
        <p>Shipping, taxes, and discounts will be calculated at checkout.</p>
        <div className='buttons-carts'>
          <div>
            <button
              className='checkout-button'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler} // Close modal after proceeding to checkout
            >
              Proceed To Checkout
            </button>
          </div>
          <div>
            <Link to={'/cart'}>
              <button className='checkout-button' onClick={closeModal}>
                View Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCartScreen
