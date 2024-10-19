import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div className='shopping-cart'>
      

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty. <Link to={`/shop`}>Go Back</Link>
        </Message>
      ) : (
        <div className='shopping-cart-items'>
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      )}
      <CartSummary cartItems={cartItems} checkoutHandler={checkoutHandler} />
    </div>
  )
}

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(item.qty) // Use the qty from the item

  const incrementQuantity = () => {
    if (qty < item.countInStock) {
      setQty(qty + 1)
      dispatch(addToCart({ ...item, qty: qty + 1 }))
    }
  }

  const decrementQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1)
      dispatch(addToCart({ ...item, qty: qty - 1 }))
    }
  }

  return (
    <>
      <div className='product-screen-bg'>
        <span>
          <Link to={`/shop`}>All</Link>
        </span>
        <span>{item.name.substring(0, 20)}</span>
      </div>
      <div className='shopping-cart-item section-center'>
        <article>
          <img
            className='shopping-cart-item-image'
            src={item.images[0]}
            alt={item.name}
          />
        </article>
        <article>
          <Link className='shopping-cart-item-name' to={`/product/${item._id}`}>
            {item.name}
          </Link>
          <div className='shopping-cart-item-price'>{item.price} CFA</div>
          <div className='quantity-controls'>
            <h3>Quantity</h3>
            <button className='quantity-button' onClick={decrementQuantity}>
              <FaMinus />
            </button>
            <input
              type='number'
              value={qty}
              onChange={(e) =>
                setQty(
                  Math.max(
                    1,
                    Math.min(item.countInStock, Number(e.target.value))
                  )
                )
              }
              min='1'
              max={item.countInStock}
              className='quantity-input'
            />
            <button className='quantity-button' onClick={incrementQuantity}>
              <FaPlus />
            </button>
          </div>
          <button
            className='shopping-cart-item-remove'
            onClick={() => dispatch(removeFromCart(item._id))}
          >
            <FaTrash />
          </button>
        </article>
      </div>
    </>
  )
}

const CartSummary = ({ cartItems, checkoutHandler }) => {
  return (
    <div className='shopping-cart-summary'>
      <h2>
        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
      </h2>
      <div className='shopping-cart-total'>
        CFA{' '}
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
  )
}

export default CartScreen
