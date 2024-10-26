import React, { useEffect, useState } from 'react'
import { Link,  useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetproductDetailQuery,
} from '../slices/productApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loading'
import RecoomendProductScreen from './RecommendProductScreen'
import { addToCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../components/Modal'

import ModalCartScreen from './ModalCartScreen'
import { FaHeart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAddToWishlistMutation } from '../slices/whislistApiSlice'


const ProductScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const [mainImage, setMainImage] = useState('')
  const { id: productId } = useParams()
 const dispatch = useDispatch()
 const [qty, setQty] = useState(1)
 const [rating, setRating] = useState(0)
 const [comment, setComment] = useState('')
 const [createReview, { isLoading: loadingProductReview }] =
   useCreateReviewMutation()
 const [deleteReview, { isLoading: loadingdeletedReview }] =
   useDeleteReviewMutation()
   const [addToWishlist, { isLoading: loadingAddToWishlist }] =
     useAddToWishlistMutation()
 const { userInfo } = useSelector((state) => state.auth)
  const {
    data: product,refetch,
    isLoading: loading,
    error,
  } = useGetproductDetailQuery(productId)

  const [activeTab, setActiveTab] = useState('description')
 const [isModalOpen, setModalOpen] = useState(false)
const openModal = () => setModalOpen(true)
const closeModal = () => setModalOpen(false)
  const handleThumbnailImageClick = (image) => {
    setMainImage(image)
  }
  const incrementQuantity = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1)
    }
  }

  const decrementQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1)
    }
  }
const addToCartHandler = () => {
  dispatch(addToCart({ ...product, qty }))
  openModal() 
}
const submitHandler = async (e) => {
  e.preventDefault()
  try {
    await createReview({
      productId,
      rating,
      comment,
    }).unwrap()
    refetch()
    toast.success('Review Submited')
    setRating(0)
    setComment('')
  } catch (error) {
    toast.error(error?.data?.message || error.error)
  }
}
const deleteReviewHandler = async (reviewId) => {
  try {
    await deleteReview({ productId, reviewId }).unwrap()
    refetch()
    toast.success('Review Deleted')
  } catch (error) {
    toast.error(error?.data?.message || error.error)
  }
}
const addToWishlistHandler = async () => {
  try {
    await addToWishlist(productId).unwrap() // Call the mutation to add to wishlist
    toast.success('Product added to wishlist!')
  } catch (error) {
    toast.error('Failed to add to wishlist. Please login.')
  }
}
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <p>{product.description}</p>
      case 'details':
        return (
          <div className='tab-content'>
            <h4>Returns Policy</h4>
            <p>
              You may return most new, unopened items within 30 days of delivery
              for a full refund. We'll also pay the return shipping costs if the
              return is a result of our error (you received an incorrect or
              defective item, etc.).
            </p>
            <h4>Shipping</h4>
            <p>
              We can ship to virtually any address in the world. Note that there
              are restrictions on some products, and some products cannot be
              shipped to international destinations.
            </p>
          </div>
        )
      case 'faq':
        return (
          <div className='faq-list'>
            <h4>FAQ</h4>

            <p>1. How will my order be delivered to me?</p>
            <p>
              Your order will be delivered via our trusted courier services
              directly to your provided address. You will also receive a
              tracking link to monitor your shipment.
            </p>

            <p>2. What do I need to know?</p>
            <p>
              You will need to ensure your delivery address is correct and
              accessible during delivery hours. Our couriers may attempt up to
              two deliveries if you're unavailable.
            </p>

            <p>3. How will I know if my order is placed successfully?</p>
            <p>
              Once your order is placed, you will receive a confirmation email
              with your order details and an expected delivery date. You can
              also view your order status in your account.
            </p>

            <p>4. How do I check the status of my order?</p>
            <p>
              You can check the status of your order by logging into your
              account on our website or by clicking the tracking link sent to
              you via email.
            </p>
          </div>
        )
      case 'size':
        return (
          <>
            <h4>Size Guide</h4>
            <table>
              <thead>
                <tr>
                  <th>EUR</th>
                  <th>FR</th>
                  <th>IND</th>
                  <th>USA</th>
                  <th>UK</th>
                  <th>INT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>36</td>
                  <td>36</td>
                  <td>36</td>
                  <td>36</td>
                  <td>36</td>
                  <td>36</td>
                </tr>
                <tr>
                  <td>38</td>
                  <td>38</td>
                  <td>38</td>
                  <td>38</td>
                  <td>38</td>
                  <td>38</td>
                </tr>
                <tr>
                  <td>40</td>
                  <td>40</td>
                  <td>40</td>
                  <td>40</td>
                  <td>40</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>42</td>
                  <td>42</td>
                  <td>42</td>
                  <td>42</td>
                  <td>42</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td>44</td>
                  <td>44</td>
                  <td>44</td>
                  <td>44</td>
                  <td>44</td>
                  <td>44</td>
                </tr>
                <tr>
                  <td>46</td>
                  <td>46</td>
                  <td>46</td>
                  <td>46</td>
                  <td>46</td>
                  <td>46</td>
                </tr>
                <tr>
                  <td>48</td>
                  <td>48</td>
                  <td>48</td>
                  <td>48</td>
                  <td>48</td>
                  <td>48</td>
                </tr>
                <tr>
                  <td>50</td>
                  <td>50</td>
                  <td>50</td>
                  <td>50</td>
                  <td>50</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
            
          </>
        )
      default:
        return <p>{product.description}</p>
    }
  }

  return (
    <>
      <Link to={`/`} className='btn'>
        Go Back
      </Link>
      <div className='product-screen-bg'>
        <span>
          <Link to={`/shop`}>All</Link>
        </span>
        <span>{product.name.substring(0, 20)}</span>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalCartScreen />
      </Modal>

      <div className='product-screen'>
        <div className='product-screen-container'>
          <article>
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
          </article>
          <article className='product-screen-context'>
            <div className='info-section'>
              <h3>{product.name.substring(0,45)}</h3>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <p>Price: ${product.price} </p>
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
              <div className='cart-details'>
                {product.countInStock > 0 && (
                  <div className='quantity-controls'>
                    <h3>Quantity</h3>
                    <button
                      className='quantity-button'
                      onClick={decrementQuantity}
                    >
                      <FaMinus />
                    </button>
                    <input
                      type='number'
                      value={qty}
                      onChange={(e) =>
                        setQty(
                          Math.max(
                            1,
                            Math.min(
                              product.countInStock,
                              Number(e.target.value)
                            )
                          )
                        )
                      }
                      min='1'
                      max={product.countInStock}
                      className='quantity-input'
                    />
                    <button
                      className='quantity-button'
                      onClick={incrementQuantity}
                    >
                      <FaPlus />
                    </button>
                  </div>
                )}
                <div className='add-to-cart-container'>
                  <button
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                    className={`add-to-cart-btn ${
                      product.countInStock === 0 ? 'disabled' : ''
                    }`}
                  >
                    Add to Cart
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={addToWishlistHandler}
                    disabled={loadingAddToWishlist}
                  >
                    <FaHeart /> Add to Wishlist
                  </button>
                </div>
                <div className='reviews-section'>
                  <div className='reviews-header'>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && (
                      <Message>No reviews</Message>
                    )}
                  </div>

                  <div className='reviews-list'>
                    {product.reviews.map((review) => (
                      <div key={review._id} className='review-item'>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                        {userInfo && review.user === userInfo._id && (
                          <button
                            className='btn-delete'
                            onClick={() => deleteReviewHandler(review._id)}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className='review-form'>
                    <h2>Write a Customer Review</h2>
                    {loadingProductReview && <Loader />}
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className='form-group'>
                          <label htmlFor='rating'>Rating</label>
                          <select
                            id='rating'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </select>
                        </div>

                        <div className='form-group'>
                          <label htmlFor='comment'>Comment</label>
                          <textarea
                            id='comment'
                            rows='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>

                        <button
                          className='btn-submit'
                          disabled={loadingProductReview}
                          type='submit'
                        >
                          Submit
                        </button>
                      </form>
                    ) : (
                      <Message>
                        Please <Link to={`/login`}>Sign In</Link> to write a
                        review
                      </Message>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='product-screen-tab'>
              <button onClick={() => setActiveTab('description')}>
                Description
              </button>
              <button onClick={() => setActiveTab('details')}>Details</button>
              <button onClick={() => setActiveTab('faq')}>FAQs</button>
              <button onClick={() => setActiveTab('size')}>Size Guide</button>
            </div>
            <div className='tab-content'>{renderTabContent()}</div>
          </article>
        </div>
        <div className='recommended-products'>
          <RecoomendProductScreen />
        </div>
      </div>
    </>
  )
}

export default ProductScreen
