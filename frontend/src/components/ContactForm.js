import React, { useState, useEffect } from 'react'
import { useSendContactFormMutation } from '../slices/contactApiSlice'
import { useLocation, useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice'

const ContactForm = () => {
  const location = useLocation()
  const { id: orderId } = useParams()
  const { data: order } = useGetOrderDetailsQuery(orderId)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    description: '',
    address: '',
    totalPrice: order ? order.totalPrice : '',
    productName:
      order && order.orderItems.length > 0
        ? order.orderItems.map((item) => item.name).join(', ')
        : '',
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [sendContactForm, { isLoading, isError }] = useSendContactFormMutation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setFormData((prevFormData) => ({
      ...prevFormData,
      totalPrice: order ? order.totalPrice : '',
    }))
  }, [location, order])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let emailContent = `
        First Name: ${formData.firstName}
        Last Name: ${formData.lastName}
        Phone Number: ${formData.phone}
        Address: ${formData.address}
        Description: ${formData.description}`

      if (formData.totalPrice) {
        emailContent += `\nTotal Price: $${formData.totalPrice}`
      }

      setIsFormSubmitted(true)

      await sendContactForm({
        ...formData,
        message: emailContent,
      })

      setFormData({
        firstName: '',
        lastName: '',
        subject: '',
        phone: '',
        description: '',
        address: '',
        totalPrice: '',
        productName: '',
      })
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <div className='contact-container'>
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit} className='contact-form'>
          <h2>Billing details</h2>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name:</label>
            <input
              type='text'
              id='firstName'
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              type='text'
              id='lastName'
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phoneNumber'>Phone Number:</label>
            <input
              type='tel'
              id='phoneNumber'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address:</label>
            <textarea
              id='address'
              rows='3'
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              rows='3'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='totalPrice'>Prix Total CFA:</label>
            <input
              type='text'
              id='totalPrice'
              value={formData.totalPrice}
              onChange={(e) =>
                setFormData({ ...formData, totalPrice: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='productName'>Product Name:</label>
            <input
              type='text'
              id='productName'
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            />
          </div>
          <button type='submit' className='btn-submit' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          {isError && (
            <div className='error-message'>
              An error occurred while submitting the form. Please try again.
            </div>
          )}
        </form>
      )}
      {isFormSubmitted && !isError && (
        <div className='success-message'>
          Message sent successfully! We will respond to you soon.
        </div>
      )}
    </div>
  )
}

export default ContactForm
