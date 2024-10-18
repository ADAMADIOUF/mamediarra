import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetproductDetailQuery } from '../slices/productApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loading'
import RecoomendProductScreen from './RecommendProductScreen'

const ProductScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const [mainImage, setMainImage] = useState('')
  const { id: productId } = useParams()
  const navigate = useNavigate()

  const {
    data: product,
    isLoading: loading,
    error,
  } = useGetproductDetailQuery(productId)

  const [activeTab, setActiveTab] = useState('description')

  const handleThumbnailImageClick = (image) => {
    setMainImage(image)
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
          <Link to={`/shp`}>All</Link>
        </span>
        <span>{product.name.substring(0, 20)}</span>
      </div>
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
              <h3>{product.name}</h3>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <p>Price: {product.price} CFA</p>
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
        <div className="recommended-products">
          <RecoomendProductScreen/>
        </div>
      </div>
    </>
  )
}

export default ProductScreen
