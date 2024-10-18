import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import navLinks from '../dataNav'
import { FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa'

const NavigationMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [isNavbar, setIsNavbar] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false) // New state for scrolling

  const toggleNav = () => {
    setIsNavbar((prev) => !prev)
  }

  const handleCategoryClick = (id) => {
    setActiveCategory(activeCategory === id ? null : id)
  }

  // Scroll effect
  const handleScroll = () => {
    const scrollTop = window.scrollY
    setIsScrolled(scrollTop > 0) // Set to true if scrolled down
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`nav-center ${isScrolled ? 'scrolled' : ''}`}>
      <div className='nav-header'>
        <div className='logo'>
          <Link to={`/`}>
            <h3>Bousso Bally</h3>
          </Link>
        </div>
        <div className='menu-icons'>
          <button onClick={toggleNav} aria-label='Toggle Menu'>
            {isNavbar ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className='nav-icons'>
          <FaSearch />
          <FaUser />
        </div>

        <ul className={`nav-links ${isNavbar ? 'show' : ''}`}>
          {navLinks.map((navItem) => (
            <li key={navItem.id} className='nav-link'>
              <button
                onClick={() => handleCategoryClick(navItem.id)}
                className='nav-button'
                aria-expanded={activeCategory === navItem.id}
              >
                {navItem.title}
              </button>
              {activeCategory === navItem.id && navItem.categories && (
                <ul className='dropdown'>
                  {navItem.categories.map((category) => (
                    <li key={category.id} className='dropdown-item'>
                      <Link to={category.link || '#'}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavigationMenu
