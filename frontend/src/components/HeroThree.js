import React from 'react'
import a from '../assets/hero3.png'

const HeroThree = () => {
  return (
    <section className='hero-two'>
      <div className='hero-image-container'>
        <div className='hero-image-background'>
          <img src={a} alt='Latest Collection' />
          <h1>men Casuals</h1>
        </div>
      </div>
      <div className='hero-text'>
        <h1>Fancy Tops</h1>
        <h2>Latest Collections</h2>
        <p>
          Discover a collection that embodies confidence, sophistication, and
          style. Our men's clothing is designed to make a statement, whether
          you’re dressing for a casual outing or a formal event. With a focus on
          quality fabrics and tailored fits, each piece combines comfort with
          contemporary fashion trends. From sleek suits to relaxed casual wear,
          our selection encourages you to express your individuality and elevate
          your wardrobe. Embrace your unique style and make every occasion an
          opportunity to stand out with our curated range of men's apparel.
        </p>

        <button className='btn'>shop now</button>
      </div>
    </section>
  )
}

export default HeroThree
