import React, { useEffect, useState } from 'react'
import a from '../assets/ladie.png'

const Hero = () => {
  const [bgColor, setBgColor] = useState('#8BC6E2') // Initial color

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

    const intervalId = setInterval(changeColor, 1000) // Change color every second

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [])

  return (
    <div className='hero-container' style={{ backgroundColor: bgColor }}>
      <div className='circle-background'></div> {/* Add this line */}
      <img
        src={a} // Replace with your image URL
        alt='Hero'
        className='hero-image'
      />
      <div className='hero-details'>
        <h1>Bienvenue à notre boutique</h1>
        <p>Découvrez les meilleurs produits ici.</p>
        <button className='btn'>Achetez maintenant</button>
      </div>
    </div>
  )
}

export default Hero
