import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

 
  if (!product || !product.images || product.images.length === 0) {
    return <div>No product data available</div>
  }

 
  const nextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

 
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  return (
    <div className='unique-details'>
      <div className='image-container'>
        
        <button
          className='prev'
          onClick={prevImage}
          disabled={currentImageIndex === 0 || product.images.length <= 1}
        >
          &#10094;
        </button>

        
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className='unique-product-img'
          />
        <button
          className='next'
          onClick={nextImage}
          disabled={
            currentImageIndex === product.images.length - 1 ||
            product.images.length <= 1
          }
        >
          &#10095;
        </button>
      </div>

      <div className='product-info'>
        <Link to={`/product/${product._id}`}>
          <h2 className='product-title'>{product.name.substring(0,20)}</h2>
        </Link>
        <div className='product-rating'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <h3 className='product-price'>${product.price}</h3>
      </div>
    </div>
  )
}

export default Product
