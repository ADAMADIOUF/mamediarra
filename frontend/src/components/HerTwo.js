import React from 'react'
import a from '../assets/hero.png'

const HeroTwo = () => {
  return (
    <section className='hero-two'>
      <div className='hero-text'>
        <h1>Fancy Tops</h1>
        <h2>Dernières Collections</h2>
        <p>
          Fames ac turpis egestas integer eget aliquet nibh praesent tristique.
          Facilisis mauris sit amet massa vitae tortor condimentum. Et
          sollicitudin ac orci phasellus egestas tellus rutrum tellus. Sed
          pulvinar proin gravida hendrerit lectus a. Semper viverra nam libero
          justo laoreet sit amet cursus sit.
        </p>
        <button className='btn'>Achetez maintenant</button>
      </div>
      <div className='hero-image-container'>
        <div className='hero-image-background'>
          <img src={a} alt='Latest Collection' />
        </div>
      </div>
    </section>
  )
}

export default HeroTwo
