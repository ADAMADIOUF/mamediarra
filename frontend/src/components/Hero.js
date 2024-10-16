import React, { useEffect, useState } from 'react'
import a from '../assets/hero4.png' // Ensure the path is correct
import b from '../assets/hero3.png' // Add your second image
import c from '../assets/hero1.png' // Add your third image
import d from '../assets/hero4.png' // Add your fourth image

const Hero = () => {
  const [bgColor, setBgColor] = useState('#8BC6E2') // Initial background color
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [a, b, c, d] // Array of images
  const texts = [
    'Bienvenue à notre boutique - Image 1',
    'Découvrez nos nouveautés - Image 2',
    'Profitez des meilleures offres - Image 3',
    'Achetez vos produits préférés - Image 4',
  ] // Array of texts corresponding to each image

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

    const colorIntervalId = setInterval(changeColor, 3000) // Change color every 3 seconds
    const imageIntervalId = setInterval(changeImage, 3000) // Change image every 3 seconds

    return () => {
      clearInterval(colorIntervalId)
      clearInterval(imageIntervalId) // Cleanup on component unmount
    }
  }, [])

  return (
    <div className='hero-container' style={{ backgroundColor: bgColor }}>
      <div className='circle-background'></div>
      <div className='hero-content'>
        <img
          src={images[currentImageIndex]} // Display the current image
          alt='Hero'
          className='hero-image'
        />
        <div className='hero-details'>
          <h1>{texts[currentImageIndex]}</h1>{' '}
          {/* Display text for the current image */}
          <p>Découvrez les meilleurs produits ici.</p>
          <button className='btn'>Achetez maintenant</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
