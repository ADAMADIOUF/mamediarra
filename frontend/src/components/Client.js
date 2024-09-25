import React, { useState } from 'react'

const Client = () => {
  const clients = [
    {
      img: 'https://dt-aaraa.myshopify.com/cdn/shop/files/test04_79abe3fa-8066-467c-b7c0-f6ccc3ec4ddc_200x200.jpg?v=1658918144',
      bgColor: '#ffcccb',
      testimonial:
        'Nibh nisl condimentum id venenatis a condimentum vitae eget egesta.',
      name: 'Chandelle',
      role: 'Choreographer',
    },
    {
      img: 'https://dt-aaraa.myshopify.com/cdn/shop/files/test03_829832c6-b4ac-45a3-b3de-c325b898ea70_200x200.jpg?v=1658918154',
      bgColor: '#add8e6',
      testimonial:
        'Vitae sapien pellentesque habitant morbi tristique senectus et auctor urna nunc.',
      name: 'Lenda Lena',
      role: 'Professor',
    },
    {
      img: 'https://dt-aaraa.myshopify.com/cdn/shop/files/test05_28abb4f1-37a5-4440-bdaa-d41e5835bf4d_200x200.jpg?v=1658918166',
      bgColor: '#90ee90',
      testimonial:
        'Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa egettu.',
      name: 'Sandra Hendry',
      role: 'Developer',
    },
    // Duplicate clients for additional entries
    {
      img: 'https://dt-aaraa.myshopify.com/cdn/shop/files/test04_79abe3fa-8066-467c-b7c0-f6ccc3ec4ddc_200x200.jpg?v=1658918144',
      bgColor: '#ffcccb',
      testimonial:
        'Nibh nisl condimentum id venenatis a condimentum vitae eget egesta.',
      name: 'Chandelle',
      role: 'Choreographer',
    },
    {
      img: 'https://dt-aaraa.myshopify.com/cdn/shop/files/test03_829832c6-b4ac-45a3-b3de-c325b898ea70_200x200.jpg?v=1658918154',
      bgColor: '#add8e6',
      testimonial:
        'Vitae sapien pellentesque habitant morbi tristique senectus et auctor urna nunc.',
      name: 'Lenda Lena',
      role: 'Professor',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerSlide = window.innerWidth >= 992 ? 3 : 1 // Show 3 on large screens, 1 on mobile
  const maxIndex = Math.ceil(clients.length / itemsPerSlide) - 1

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className='client-slider'>
      <div className='client-carousel-container'>
        <div
          className='client-carousel-items'
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {clients.map((client, index) => (
            <div
              className='client-carousel-item'
              key={index}
              style={{
                flex: `0 0 ${100 / itemsPerSlide}%`,
                backgroundColor: client.bgColor,
              }}
            >
              <img src={client.img} alt={`Client ${index + 1}`} />
              <div className='client-testimonial'>
                <p>"{clients[currentIndex].testimonial}"</p>
                <p>
                  <strong>{clients[currentIndex].name}</strong>,{' '}
                  {clients[currentIndex].role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='client-carousel-controls'>
        <span>
          {currentIndex + 1} / {clients.length}
        </span>
      </div>

      <div className='client-btn'>
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className='client-prev'
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className='client-next'
        >
          &#10095;
        </button>
      </div>
    </div>
  )
}

export default Client
