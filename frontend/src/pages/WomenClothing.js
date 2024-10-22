import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetProductsClothingQuery } from '../slices/productApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loading'

const Clothing = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const { data, isLoading: loading, error } = useGetProductsClothingQuery()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message />
  }

  if (!data) {
    return <p>No data available.</p>
  }

  // Filter products specifically for Men's Clothing
  const menClothingProducts = data.products.filter(
    (product) =>
      product.category === 'Clothing' && product.subcategory === 'Women Clothing'
  )

  return (
    <>
      <h2 className='section-title'>Men's Clothing Collection</h2>
      <p className='section-description'>
        Keep your style sharp and sophisticated with our latest collection of
        men's clothing.
      </p>

      <div className='clothing-container'>
        {menClothingProducts.length === 0 ? (
          <p>No men's clothing available.</p>
        ) : (
          menClothingProducts.map((product) => (
            <div key={product._id} className='product-clothing-card'>
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className='product-image-clothing'
                />
              </Link>
              <div className='product-details-clothing'>
                <Link to={`/product/${product._id}`}>
                  <h3 className='product-title-clothing'>{product.name}</h3>
                </Link>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <p className='product-price-clothing'>{product.price} CFA</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Clothing
