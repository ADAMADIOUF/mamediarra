import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Import Link for navigation
import navLinks from '../dataNav' // Ensure this path is correct
import { FaCartPlus, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa'

const NavigationMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [isNavbar, setIsNavbar] = useState(false)

  const toggleNav = () => {
    setIsNavbar((prev) => !prev)
  }

  const handleClick = (id) => {
    if (activeCategory === id) {
      setActiveCategory(null) // Close the dropdown if the same item is clicked
    } else {
      setActiveCategory(id) // Open the dropdown for the clicked item
    }
  }

  return (
    <nav className='nav-center'>
      <div className='nav-header'>
        <div className='logo'>
          <h3>bousso bally</h3>
        </div>
        <div className='menu-icons'>
          <button onClick={toggleNav}>
            {isNavbar ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className='nav-icons'>
          <FaSearch />
          <FaUser />
          <FaCartPlus />
        </div>

        <ul className={`nav-links ${isNavbar ? 'show' : ''}`}>
          {navLinks.map((navItem) => (
            <li
              key={navItem.id}
              className='nav-link'
              onClick={() => handleClick(navItem.id)}
            >
              {/* Use Link for navigation */}
              <Link to={navItem.link || '#'} className='nav-button'>
                {navItem.name}
              </Link>
              {activeCategory === navItem.id && navItem.categories && (
                <ul className='dropdown'>
                  {navItem.categories.map((category) => (
                    <li key={category.id} className='dropdown-item'>
                      <Link to={category.link}>{category.name}</Link>
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
