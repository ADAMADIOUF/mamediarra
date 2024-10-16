import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import {
 
  useGetproductDetailQuery,
} from '../slices/productApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'

const ProductScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const [mainImage, setMainImage] = useState('')
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {
    data: product,
    refetch,
    isLoading: loading,
    error,
  } = useGetproductDetailQuery(productId)

  const handleThumbnailImageClick = (image) => {
    setMainImage(image)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  return (
    <>
      <Link to={`/`} className='btn btn-light my-3'>
        Go Back
      </Link>
      
      <div className='product-screen'>
        <div className='image-section'>
          <img
            src={mainImage || product.images[0]}
            alt={product.name}
            className='main-image'
          />
          <div className='thumbnail-container'>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className={`thumbnail ${
                  mainImage === image ? 'thumbnail-active' : ''
                }`}
                onClick={() => handleThumbnailImageClick(image)}
                style={{ cursor: 'pointer', width: '50px', height: '50px' }}
              />
            ))}
          </div>
        </div>

        <div className='info-section'>
          <h3>{product.name}</h3>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <p>Price: {product.price} CFA</p>
          <p>Description: {product.description}</p>
        </div>

        <div className='cart-section'>
          <div>
            <strong>Price:</strong> {product.price} CFA
          </div>
          <div>
            <strong>Status:</strong>{' '}
            {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
          </div>
          

        </div>
      </div>
    </>
  )
}

export default ProductScreen
