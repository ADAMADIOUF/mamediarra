import React, { useEffect, useState } from 'react'
import { FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa' // Importing icons
import a from '../assets/heroone.png'
import b from '../assets/herotwo.png'
import c from '../assets/herothree.png'
import d from '../assets/herofour.png'

const Hero = () => {
  const [bgColor, setBgColor] = useState('#8BC6E2') // Initial background color
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [a, b, c, d]
  const texts = [
    'Welcome to our store',
    'Discover our new arrivals',
    'Enjoy the best offers',
    'Shop your favorite products',
  ]

  useEffect(() => {
    const colors = [
      '#D5CA93',
      '#D594DE',
      '#3357ff',
      '#f1c40f',
      '#8e44ad',
      '#F8CE74',
    ]

    const changeColor = () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setBgColor(randomColor)
    }

    const changeImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const colorIntervalId = setInterval(changeColor, 3000)
    const imageIntervalId = setInterval(changeImage, 3000)

    return () => {
      clearInterval(colorIntervalId)
      clearInterval(imageIntervalId)
    }
  }, [])

  return (
    <div className='hero-container' style={{ backgroundColor: bgColor }}>
      <div className='circle-background'></div>
      <div className='hero-content'>
        <img
          src={images[currentImageIndex]}
          alt='Hero'
          className='hero-image'
        />
        <div className='hero-details'>
          <h1>{texts[currentImageIndex]}</h1>
          <p>Discover the best products here.</p>
          <button className='btn'>Shop Now</button>
        </div>
      </div>

      {/* Adding the icons with text */}
      <div className='hero-icons'>
        <div className='icon-box'>
          <FaTruck className='icon' />
          <p>Free Delivery</p>
        </div>
        <div className='icon-box'>
          <FaShieldAlt className='icon' />
          <p>Security Guarantee</p>
        </div>
        <div className='icon-box'>
          <FaUndo className='icon' />
          <p>Free Return</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
