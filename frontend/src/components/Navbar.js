import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import navLinks from '../dataNav' // Ensure this path is correct
import { FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa'

const NavigationMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [isNavbar, setIsNavbar] = useState(false)

  const toggleNav = () => {
    setIsNavbar((prev) => !prev)
  }

  const handleCategoryClick = (id) => {
    setActiveCategory(activeCategory === id ? null : id)
  }

  return (
    <nav className='nav-center'>
      <div className='nav-header'>
        <div className='logo'>
          <Link to={`/`}>
            <h3>Visit Senegal Now</h3>
          </Link>
        </div>
        <div className='menu-icons'>
          <button onClick={toggleNav}>
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
