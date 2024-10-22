import React, { useEffect } from 'react'
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from '../slices/orderApiSlice'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message'
import Loader from '../components/Loading'
import { useSelector } from 'react-redux'
import ContactForm from '../components/ContactForm'

const OrderScreen = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [])

  const { id: orderId } = useParams()
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId)
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery()
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation()
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'XAF', // Change currency to Franc CFA
          },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript()
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success(`Payment successful`)
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    })
  }

  function onError(error) {
    toast.error(error.message)
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice.toString(), // Send as a string without decimals
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId
      })
  }


  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order delivered')
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger' />
  ) : (
    <div className='order-screen'>
      <h1 className='order-title'>Order id {order._id}</h1>
      <div className='order-details'>
        <div className='shipping-info'>
          <h2 className='info-title'>Shipping</h2>
          <p className='info-text'>
            <strong>Name:</strong> {order.user.name}
          </p>
          <p className='info-text'>
            <strong>Email:</strong> {order.user.email}
          </p>
          <p className='info-text'>
            <strong>Address:</strong> {order.shippingAddress.address},{' '}
            {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
            {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <Message variant='success'>
              Delivered on {order.deliveredAt.substring(0, 10)}
            </Message>
          ) : (
            <Message variant='danger'>Not delivered</Message>
          )}
        </div>
        <div className='payment-info'>
          <h2 className='info-title'>Payment Method</h2>
          <p className='info-text'>
            <strong>Method:</strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <Message variant='success'>
              Paid on {order.paidAt.substring(0, 10)}
            </Message>
          ) : (
            <Message variant='danger'>Not Paid</Message>
          )}
        </div>
        <div className='order-items'>
          <h2 className='info-title'>Order Items</h2>
          {order.orderItems.map((item, index) => (
            <div className='order-item' key={index}>
              <div className='item-image'>
                <img src={item.images[0]} alt={item.name} />
              </div>
              <div className='item-details'>
                <Link to={`/product/${item.product}`} className='item-link'>
                  {item.name}
                </Link>
                <p className='item-price'>
                  {item.qty} x {item.price} CFA = {item.qty * item.price} CFA
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='order-summary'>
        <h2 className='info-title'>Order Summary</h2>
        <div className='summary-row'>
          <span>Items:</span> <span>{order.itemsPrice} CFA</span>
        </div>
        <div className='summary-row'>
          <span>Shipping:</span> <span>{order.shippingPrice} CFA</span>
        </div>
        <div className='summary-row'>
          <span>Tax:</span> <span>{order.taxPrice} CFA</span>
        </div>
        <div className='summary-row'>
          <span>Total:</span> <span>{order.totalPrice} CFA</span>
        </div>
        {order.paymentMethod === 'Cash on Delivery' && !order.isPaid && (
          <div className='payment-section'>
            {loadingPay && <Loader />}
            {isPending ? <Loader /> : <ContactForm/>}
          </div>
        )}
        {order.paymentMethod !== 'Cash on Delivery' && !order.isPaid && (
          <div className='payment-section'>
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            )}
          </div>
        )}
        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <button className='btn-deliver' onClick={deliverHandler}>
            Mark As Delivered
          </button>
        )}
      </div>
    </div>
  )

}

export default OrderScreen
