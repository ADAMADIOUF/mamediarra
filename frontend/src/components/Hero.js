import React, { useEffect, useState } from 'react'
import a from '../assets/hero1.png' // Ensure the path is correct

const Hero = () => {
  const [bgColor, setBgColor] = useState('#8BC6E2') // Initial background color

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

    const intervalId = setInterval(changeColor, 3000) // Change color every 3 seconds

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [])

  return (
    <div className='hero-container' style={{ backgroundColor: bgColor }}>
      <div className='circle-background'></div>
      <div className='hero-content'>
        <img
          src={a}
          alt='Hero'
          className='hero-image'
        />
        <div className='hero-details'>
          <h1>Bienvenue à notre boutique</h1>
          <p>Découvrez les meilleurs produits ici.</p>
          <button className='btn'>Achetez maintenant</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
