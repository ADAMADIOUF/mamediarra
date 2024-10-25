import React from 'react'
import a from '../assets/hero.png'
import {Link} from "react-router-dom"
const HeroTwo = () => {
  return (
    <section className='hero-two '>
      <div className='hero-text'>
        <h1>Fancy Tops</h1>
        <h2>Latest Collections</h2>
        <p>
          Explore our latest collection of stylish tops. Designed for comfort
          and elegance, each piece offers a perfect blend of modern trends and
          timeless appeal. Whether you're dressing up for a special occasion or
          adding a chic touch to your everyday wardrobe, our collection has
          something for everyone. Discover the beauty of effortless fashion with
          our carefully curated selection.
        </p>
        <Link to="/clothing/womens"><button className='btn'>Shop Now</button></Link>
      </div>
      <div className='hero-image-container'>
        <div className='hero-image-background'>
          <img src={a} alt='Latest Collection' />
          <h1>Women Casuals</h1>
        </div>
      </div>
    </section>
  )
}

export default HeroTwo
