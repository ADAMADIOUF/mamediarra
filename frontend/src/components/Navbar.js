import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navLinks from '../dataNav'
import {
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaShoppingCart,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import CartButton from './CartButton'

const NavigationMenu = ({ toggleCart }) => {
  // Accept openCart as a prop
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [activeCategory, setActiveCategory] = useState(null)
  const [isNavbar, setIsNavbar] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleNav = () => {
    setIsNavbar((prev) => !prev)
  }

  const handleCategoryClick = (id) => {
    setActiveCategory(activeCategory === id ? null : id)
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY
    setIsScrolled(scrollTop > 0)
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
        <div className='nav-icons'>
          <FaSearch />
          <FaUser />
        </div>
        <CartButton cartItems={cartItems} toggleCart={toggleCart} />
      </div>
    </nav>
  )
}

export default NavigationMenu
