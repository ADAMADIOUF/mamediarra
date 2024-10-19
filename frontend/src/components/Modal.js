import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          X
        </button>
        {children} {/* Render modal content */}
      </div>
    </div>
  )
}

export default Modal
