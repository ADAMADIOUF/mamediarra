import React, { useState, useEffect } from 'react'
import { FaEye } from 'react-icons/fa'
import { useParams, Link } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productApiSlice'

const LastProducts = () => {
  const { pageNumber = 1, keyword = '' } = useParams()

  const {
    data,
    isLoading: loading,
    error,
  } = useGetProductsQuery({ pageNumber, keyword })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (data?.products.length || 1)
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [data?.products.length])

  const handleOpenGallery = (index) => {
    setModalIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleNext = () => {
    setModalIndex(
      (prevIndex) => (prevIndex + 1) % data.products[modalIndex].images.length
    )
  }

  const handlePrev = () => {
    setModalIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.products[modalIndex].images.length) %
        data.products[modalIndex].images.length
    )
  }

  const getVisibleProducts = () => {
    if (!data || !data.products) return []

    if (currentIndex + 3 <= data.products.length) {
      return data.products.slice(currentIndex, currentIndex + 3)
    } else {
      return [
        ...data.products.slice(currentIndex),
        ...data.products.slice(0, (currentIndex + 3) % data.products.length),
      ]
    }
  }

  const handleContactUs = () => {
    window.location.href = 'tel:+221770129716'
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading products!</div>

  return (
    <div className='lastProducts-home-projects section-center'>
      <h2>Explore Our Fresh Collections</h2>
      <p>
        Discover the latest additions to our clothing line, designed to make you
        look and feel amazing. For high-quality clothing services, don’t
        hesitate to contact us!
      </p>
      <div className='lastProducts-slider-gallery-home-projects'>
        <div className='lastProducts-project-slide'>
          {getVisibleProducts().map((product, index) => (
            <div className={`lastProducts-project`} key={product.id}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images[3]}
                  alt={product.name}
                  className='lastProducts-project-image'
                  onClick={() => handleOpenGallery(index)}
                />
              </Link>
              <div className='lastProducts-button-container'>
                <button
                  className='lastProducts-open-gallery-btn'
                  onClick={() => handleOpenGallery(index)}
                >
                  <FaEye />
                </button>
              </div>
              <div className='lastProducts-project-info'>
                <Link to={`/product/${product._id}`}>
                  <h4>{product.name.substring(0, 30)}</h4>
                </Link>
                <h3 className='product-price'>{product.price}</h3>
                <button
                  className='lastProducts-explore-btn'
                  onClick={handleContactUs}
                >
                  Contact Us
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='lastProducts-project-indicators'>
          {data.products.map((_, index) => (
            <span
              key={index}
              className={`lastProducts-indicator ${
                currentIndex === index ? 'active' : ''
              }`}
            ></span>
          ))}
        </div>
      </div>
      {/* Modal for Image Viewing */}
      {isModalOpen && (
        <div className='lastProducts-modal'>
          <span className='lastProducts-close-btn' onClick={handleCloseModal}>
            &times;
          </span>
          <div className='lastProducts-modal-content'>
            <img
              src={data.products[modalIndex].images[0]} // Use images array for modal
              alt={data.products[modalIndex].title}
              className='lastProducts-modal-image'
            />
            <h4>{data.products[modalIndex].title}</h4>
            <p>{data.products[modalIndex].description}</p>
            <div className='lastProducts-modal-buttons'>
              <button className='lastProducts-prev-btn' onClick={handlePrev}>
                Previous
              </button>
              <button className='lastProducts-next-btn' onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LastProducts
