import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useGetOrdersQuery } from '../slices/orderApiSlice'
import Loader from '../components/Loading'
import Message from '../components/Message'
import { Button } from 'react-bootstrap'

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='order-list'>
          {orders.map((order) => (
            <div className='order-card' key={order._id}>
              <div className='order-item'>
                <strong>ID:</strong> {order._id}
              </div>
              <div className='order-item'>
                <strong>User:</strong> {order.user && order.user.name}
              </div>
              <div className='order-item'>
                <strong>Date:</strong> {order.createdAt.substring(0, 10)}
              </div>
              <div className='order-item'>
                <strong>Total:</strong> ${order.totalPrice}
              </div>
              <div className='order-item'>
                <strong>Paid:</strong>{' '}
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </div>
              <div className='order-item'>
                <strong>Delivered:</strong>{' '}
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </div>
              <div className='order-item'>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>
                    Details
                  </Button>
                </LinkContainer>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default OrderListScreen
