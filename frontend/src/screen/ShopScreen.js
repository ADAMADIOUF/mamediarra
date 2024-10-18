import React, { useState } from 'react'
import { useGetProductsQuery } from '../slices/productApiSlice' 
import { Link } from 'react-router-dom'
import { FaTh, FaThList } from 'react-icons/fa'

const HomeProducts = () => {
  const [keyword] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [category, setCategory] = useState('')
  const [inStock, setInStock] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100) // Set a default max price
  const [isGrid2Row, setIsGrid2Row] = useState(true)
  const pageNumber = 1 // Set your page number as needed

  const {
    data: productsData,
    error,
    isLoading,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
    sortBy: sortOption,
    minPrice,
    maxPrice,
    inStock,
  })

  const products = productsData?.products || []
  const inStockCount = products.filter(
    (product) => product.countInStock > 0
  ).length
  const outOfStockCount = products.filter(
    (product) => product.countInStock === 0
  ).length

  return (
    <div className='shop'>
      <div className='bg-shop'>
        <Link to={'/'}>Home</Link>
      </div>
      <div className='container-shop-one'>
        <div>
          <div className='shop-grid'>
            <article>
              <h3>Availability</h3>
              <p>
                In stock: <span className='inStock-bg'>{inStockCount}</span>
              </p>
              <p>
                Out of stock:{' '}
                <span className='outStock-bg'>{outOfStockCount}</span>
              </p>
            </article>
          </div>
        </div>
        <div>
          <article>
            <h3>Display as</h3>
            <button onClick={() => setIsGrid2Row(true)} className='grid-one'>
              <FaThList />
            </button>
            <button onClick={() => setIsGrid2Row(false)} className='grid-two'>
              <FaTh />
            </button>
          </article>
        </div>
        <div>
          <article>
            <label>
              Sort by:
              <select onChange={(e) => setSortOption(e.target.value)}>
                <option value=''>Default</option>
                <option value='priceAsc'>Price: Low to High</option>
                <option value='priceDesc'>Price: High to Low</option>
                <option value='rating'>Top Rated</option>
              </select>
            </label>
          </article>
        </div>
      </div>
      <div className='container-shop'>
        <article>
          <h4>Filter by Price</h4>
          <label>
            From $
            <input
              type='number'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            To $
            <input
              type='number'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </article>
        <article>
          <h4>Filter by Category</h4>
          <label>
            Category:
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value=''>All Categories</option>
              <option value='Bag'>Bag</option>
              <option value='Clothing'>Clothing</option>
              <option value='Men'>Men</option>
              <option value='Beauty'>Beauty</option>
              <option value='Home'>Home</option>
            </select>
          </label>
        </article>
        <article>
          <h4>Filter by Rating</h4>
          <label>
            Minimum Rating:
            <select onChange={(e) => setInStock(e.target.value)}>
              <option value=''>All Ratings</option>
              <option value='1'>1 Star & Up</option>
              <option value='2'>2 Stars & Up</option>
              <option value='3'>3 Stars & Up</option>
              <option value='4'>4 Stars & Up</option>
              <option value='5'>5 Stars</option>
            </select>
          </label>
        </article>
        <article>
          <h4>Products</h4>
          <div
            className={`product-list ${
              isGrid2Row ? 'grid-2-row' : 'grid-3-row'
            }`}
          >
            {isLoading && <p>Loading products...</p>}
            {error && <p>Error loading products: {error.message}</p>}
            {products.map((product) => (
              <div key={product._id} className='product-item'>
                <img src={product.images[0]} alt={product.name} />
                <h5>{product.name}</h5>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating} Stars</p>
                <p>{product.description}</p>
                <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default HomeProducts
