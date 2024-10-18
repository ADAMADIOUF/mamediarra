import React, { useState, useEffect } from 'react'

const testimonials = [
  {
    img: 'https://via.placeholder.com/80',
    title: 'Great Service!',
    rating: 5,
    description:
      "The team was amazing, and I couldn't be happier with the results.",
    name: 'John Doe',
    backgroundColor: '#fce4ec', // Add a background color
  },
  {
    img: 'https://via.placeholder.com/80',
    title: 'Highly Recommend!',
    rating: 5,
    description: 'Excellent communication and a fantastic outcome.',
    name: 'Jane Smith',
    backgroundColor: '#e1f5fe',
  },
  {
    img: 'https://via.placeholder.com/80',
    title: 'Outstanding Support!',
    rating: 4,
    description: 'Very responsive team, and the work was top-notch.',
    name: 'Michael Lee',
    backgroundColor: '#e8f5e9',
  },
  {
    img: 'https://via.placeholder.com/80',
    title: 'Excellent Product!',
    rating: 5,
    description: 'The product exceeded my expectations, would recommend!',
    name: 'Anna Davis',
    backgroundColor: '#fffde7',
  },
  {
    img: 'https://via.placeholder.com/80',
    title: 'Awesome Team!',
    rating: 5,
    description: 'Very professional and easy to work with.',
    name: 'Mark Wilson',
    backgroundColor: '#f3e5f5',
  },
  {
    img: 'https://via.placeholder.com/80',
    title: 'Amazing Experience!',
    rating: 5,
    description: 'Would love to work with them again!',
    name: 'Emily Rose',
    backgroundColor: '#ffebee',
  },
  {
    img: 'https://via.placeholder.com/80',
    title:
      'Vitae sapien pellentesque habitant morbi tristique senectus et auctor urna nunc.',
    rating: 5,
    description:
      'Vitae sapien pellentesque habitant morbi tristique senectus et auctor urna nunc.',
    name: 'Lenda Lena',
    role: 'Professor',
    backgroundColor: '#e0f7fa',
  },
  {
    img: 'https://via.placeholder.com/80',
    title:
      'Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa egettu.',
    rating: 5,
    description:
      'Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa egettu.',
    name: 'Sandra Hendry',
    role: 'Developer',
    backgroundColor: '#f1f8e9',
  },
]

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsPerPage = window.innerWidth > 768 ? 3 : 1
  const totalSlides = testimonials.length - testimonialsPerPage

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < totalSlides ? prevIndex + 1 : 0
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [totalSlides])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className='clients'>
      <section className='contact-section'>
        <h2>Get In Touch</h2>
        <p>Our Clients</p>
        <p>Try our new customers</p>
      </section>
      <div className='testimonial-container'>
        <div
          className='testimonial-slider'
          style={{
            transform: `translateX(-${
              currentIndex * (100 / testimonialsPerPage)
            }%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              className={`testimonial-item ${
                index === currentIndex ? 'active' : ''
              }`}
              key={index}
              style={{
                flex: `0 0 ${100 / testimonialsPerPage}%`,
                backgroundColor: testimonial.backgroundColor, // Set background color
                height: index === currentIndex ? '300px' : '350px', // Adjust height for active item
                transition: 'height 0.3s ease', // Smooth transition for height change
              }}
            >
              <img
                src={testimonial.img}
                alt={`Client ${index + 1}`}
                className='client-image'
              />
              <div className='testimonial-info'>
                <h3 className='testimonial-title'>{testimonial.title}</h3>
                <div className='rating'>{'⭐'.repeat(testimonial.rating)}</div>
                <p className='testimonial-description'>
                  {testimonial.description}
                </p>
                <p className='client-name'>{testimonial.name}</p>
                {testimonial.role && (
                  <p className='client-role'>{testimonial.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className='dots-container'>
          {[...Array(totalSlides + 1)].map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
