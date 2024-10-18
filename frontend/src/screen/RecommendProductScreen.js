// RecoomendProductScreen.js
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetProductsClothingQuery } from '../slices/productApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loading'

const RecoomendProductScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const { data, isLoading: loading, error } = useGetProductsClothingQuery()

  const [selectedProduct, setSelectedProduct] = useState(null) // State to manage the selected product

  // Check if data is still loading
  if (loading) {
    return <Loader />
  }

  // Check for errors
  if (error) {
    return <Message />
  }

  // Check if data is available
  if (!data) {
    return <p>No data available.</p>
  }

  // Filter products by category
  const recommendedProducts = data.products.filter(
    (product) => product.category === 'Clothing'
  )

  const handleProductSelect = (product) => {
    setSelectedProduct(product) // Set the selected product
  }

  // If a product is selected, show its details
  if (selectedProduct) {
    return (
      <>
        <button onClick={() => setSelectedProduct(null)}>
          Back to Recommendations
        </button>
        
      </>
    )
  }

  // Default view: Show recommended products
  return (
    <>
      <h2>Trendy Clothing Selection</h2>
      <p>
        Discover our versatile collection of clothing, designed to keep you
        stylish and comfortable in any setting, whether it's casual outings or
        special occasions.
      </p>

      <Row>
        {recommendedProducts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 p-3 rounded'>
              <Link
                to={`/product/${product._id}`}
                onClick={() => handleProductSelect(product)}
              >
                <Card.Img
                  src={product.images[0]}
                  variant='top'
                  className='product-image'
                />
              </Link>
              <Card.Body>
                <Link
                  to={`/product/${product._id}`}
                  onClick={() => handleProductSelect(product)}
                >
                  <Card.Title as='div' className='product-title'>
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as='div'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </Card.Text>
                <Card.Text as='h3'>{product.price} CFA</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default RecoomendProductScreen
