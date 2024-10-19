import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartScreen from './screen/CartScreen'
import Modal from './components/Modal' // Ensure Modal is imported

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false) // Renamed for clarity

  const toggleCart = () => {
    setIsModalOpen((prevState) => !prevState) // Toggle modal open/close
  }

  const closeModal = () => {
    setIsModalOpen(false) // Function to close the modal
  }

  return (
    <div>
      <Navbar toggleCart={toggleCart} />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CartScreen />
        </Modal>
      )}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
