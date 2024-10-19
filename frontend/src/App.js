import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Modal from './components/Modal'

import ModalCartScreen from './screen/ModalCartScreen'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleCart = () => setIsModalOpen(!isModalOpen)

  return (
    <>
      <Navbar toggleCart={toggleCart} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={toggleCart} // This will close the modal when clicking outside or on the close button
        >
          <ModalCartScreen closeModal={toggleCart} />{' '}
          {/* Pass toggleCart to close the modal */}
        </Modal>
      )}
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
