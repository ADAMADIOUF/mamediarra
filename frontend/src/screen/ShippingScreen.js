import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savesShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  )
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savesShippingAddress({ address, city, postalCode, country }))
    navigate(`/payment`)
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={submitHandler} className='shipping-form'>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            id='address'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            id='city'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            type='text'
            id='postalCode'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            id='country'
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Continue
        </button>
      </form>
    </>
  )
}

export default ShippingScreen
