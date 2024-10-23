import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navLinks from '../dataNav'
import {
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHeart,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import CartButton from './CartButton'
import { clearCartItems } from '../slices/cartSlice'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userApiSlice'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css' // Import styles for react-dropdown
import SearchProduct from './SearchProduct'

const NavigationMenu = ({ toggleCart }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(clearCartItems())
      navigate(`/login`)
    } catch (error) {
      console.log(error)
    }
  }

  const [activeCategory, setActiveCategory] = useState(null)
  const [isNavbar, setIsNavbar] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleNav = () => {
    setIsNavbar((prev) => !prev)
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
    <nav className={`nav-center-nav ${isScrolled ? 'scrolled' : ''}`}>
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
              <Dropdown
                options={navItem.categories.map((category) => ({
                  value: category.link,
                  label: category.name,
                }))}
                onChange={(option) => navigate(option.value)}
                controlClassName='dropdown-control'
                placeholderClassName='dropdown-placeholder'
                arrowClassName='dropdown-arrow'
                placeholder={navItem.title}
              />
            </li>
          ))}
        </ul>
<SearchProduct/>
        <div className='nav-icon'>
          {userInfo ? (
            <div className='register-dropdown'>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='nav-user'
              >
                {userInfo.name}
              </button>
              {dropdownOpen && (
                <div className='dropdown-user'>
                  <Link to='/profile' className='dropdown-item'>
                    <FaUser /> Profile
                  </Link>
                  <Link to='/wishlist' className='dropdown-item'>
                    <FaHeart /> Wishlist
                  </Link>
                  <button onClick={logoutHandler} className='dropdown-item'>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login' className='nav-button'>
              <FaUser /> Sign In
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className='admin-dropdown'>
              <button className='admin-dropdown-toggle'>Admin</button>
              <div className='admin-dropdown-menu'>
                <Link to='/admin/productlist' className='admin-dropdown-item'>
                  Products
                </Link>
                <Link to='/admin/orderlist' className='admin-dropdown-item'>
                  Orders
                </Link>
                <Link to='/admin/userlist' className='admin-dropdown-item'>
                  Users
                </Link>
              </div>
            </div>
          )}
        </div>
        <CartButton cartItems={cartItems} toggleCart={toggleCart} />
      </div>
    </nav>
  )
}

export default NavigationMenu
