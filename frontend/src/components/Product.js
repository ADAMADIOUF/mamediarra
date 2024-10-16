import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Ensure that product exists before rendering
  if (!product || !product.images || product.images.length === 0) {
    return <div>No product data available</div>
  }

  // Function to go to the next image
  const nextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  // Function to go to the previous image
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  return (
    <div className='unique-details'>
      <div className='image-container'>
        {/* Disable the previous button if the current index is 0 or if there's only 1 image */}
        <button
          className='prev'
          onClick={prevImage}
          disabled={currentImageIndex === 0 || product.images.length <= 1}
        >
          &#10094;
        </button>

        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className='unique-product-img'
          />
        </Link>

        {/* Disable the next button if at the last image or if there's only 1 image */}
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
          <h2 className='product-title'>{product.name}</h2>
        </Link>
        <div className='product-rating'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <h3 className='product-price'>{product.price} CFA</h3>
      </div>
    </div>
  )
}

export default Product
