import React, { useState } from 'react'
import a from '../assets/unique1.png'
import products from '../data'

const Uniques = () => {
  return (
    <div className='unique-container'>
      <div className='unique-big-img'>
        <img
          src={a}
          alt=''
        />
      </div>
      <div className='unique-products'>
        {products.slice(0, 3).map((product) => (
          <UniqueProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

const UniqueProduct = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
          disabled={currentImageIndex === 0}
        >
          &#10094;
        </button>
        <img src={product.images[currentImageIndex]} alt={product.name} className='unique-product-img' />
        <button
          className='next'
          onClick={nextImage}
          disabled={currentImageIndex === product.images.length - 1}
        >
          &#10095;
        </button>
      </div>
      <h3>{product.name.substring(0, 5)}</h3>
      <p>${product.price}</p>
    </div>
  )
}

export default Uniques
