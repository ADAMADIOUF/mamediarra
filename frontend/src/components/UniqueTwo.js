import React from 'react'
import { Link, useParams } from 'react-router-dom'
import a from '../assets/unique2.png'
import { useGetProductsClothingQuery } from '../slices/productApiSlice'
import Loading from './Loading'
import Message from './Message'
import Paginate from './Paginate'

const Uniques = () => {
  const { data, isLoading: loading, error } = useGetProductsClothingQuery()


  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Message variant='danger'>
        {error?.data?.message || 'Error occurred'}
      </Message>
    )
  }
const menClothingProducts = data.products.filter(
    (product) =>
      product.category === 'Clothing' && product.subcategory === 'Men'
  )

  return (
    <>
      <div className='unique-container'>
        <div className='unique-products'>
          {menClothingProducts.slice(0, 3).map((product) => (
            <UniqueProduct key={product.id} product={product} />
          ))}
        </div>
        <div className='unique-big-img'>
          <img src={a} alt='Unique item' />
        </div>
      </div>
      
    </>
  )
}

const UniqueProduct = ({ product }) => {
  return (
    <div className='unique-details'>
      <div className='image-container'>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className='unique-product-img'
          />
        </Link>
      </div>
      <h2 className='product-title'>{product.name.substring(0, 20)}</h2>
      <p>${product.price}</p>
    </div>
  )
}

export default Uniques
