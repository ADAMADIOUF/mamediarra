import React, { useEffect, useState } from 'react'

const url = `http://localhost:3000/products`

const Product = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setProducts(data)
      console.log('Fetched Products:', data) // Log fetched products
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const itemsPerSlide = windowWidth >= 992 ? 4 : 1
  const maxIndex = Math.ceil(products.length / itemsPerSlide) - 1

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log('Rendering products:', products) // Log products before rendering

  return (
    <div className='carousel'>
      <div className='carousel-container'>
        <div
          className='carousel-items'
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className='carousel-items-products'
              style={{
                flex: `0 0 ${100 / itemsPerSlide}%`,
                boxSizing: 'border-box',
                padding: '10px',
              }}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p> {/* Display product price */}
            </div>
          ))}
        </div>
      </div>
      <div className='carousel-controls'>
        <button onClick={prevSlide} disabled={currentIndex === 0}>
          &#10094; {/* Left arrow */}
        </button>
        <button onClick={nextSlide} disabled={currentIndex === maxIndex}>
          &#10095; {/* Right arrow */}
        </button>
      </div>
    </div>
  )
}

export default Product
