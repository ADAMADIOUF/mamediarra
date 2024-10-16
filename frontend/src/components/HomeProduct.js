import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Paginate from './Paginate'
import Product from './Product'
import Loading from './Loading'
import Message from './Message'
import { useGetProductsQuery } from '../slices/productApiSlice'

const HomeProduct = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const { pageNumber, keyword } = useParams()
  const {
    data,
    isLoading: loading,
    error,
  } = useGetProductsQuery({ pageNumber, keyword })
console.log(data);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  if (!data || !data.products || data.products.length === 0) {
    return (
      <>
        <Link to='/' className='back-btn'>
          Go Back
        </Link>
        <Message variant='info'>No products found</Message>
      </>
    )
  }

  return (
    <div className='home-product'>
      {!keyword ? (
        <h1>Best Sellers</h1>
      ) : (
        <Link to='/' className='back-btn'>
          Go Back
        </Link>
      )}

      <div className='unique-container'>
        {data.products.map((product) => (
          <div key={product._id} className='unique-products'>
            <Product product={product} />
          </div>
        ))}
      </div>

      <Paginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ''}
      />
    </div>
  )
}

export default HomeProduct
