import React from 'react'

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <h3
        style={{
          textAlign: 'center',
          backgroundColor: '#E4BAC0',
          color: '#fff',
        }}
      >
        Shop now & get 10% off on every products.
      </h3>
      <div style={containerStyle}>
        <div style={columnStyle}>
          <h3>Customer Services</h3>
          <ul>
            <li>Orders</li>
            <li>Returns</li>
            <li>Gift Cards</li>
            <li>Shipping</li>
            <li>International Shipping</li>
            <li>Size Guide</li>
            <li>Measuring Guide</li>
          </ul>
        </div>

        <div style={columnStyle}>
          <h3>Information</h3>
          <ul>
            <li>Stores</li>
            <li>Events</li>
            <li>Cancellation</li>
            <li>Privacy</li>
            <li>Policies</li>
            <li>Settings</li>
            <li>Help</li>
          </ul>
        </div>

        <div style={columnStyle}>
          <h3>Company</h3>
          <ul>
            <li>Gallery</li>
            <li>Rewards Program</li>
            <li>Trade Program</li>
            <li>Settings</li>
            <li>Diversity</li>
            <li>Accessibility</li>
            <li>Career</li>
          </ul>
        </div>

        <div style={columnStyle}>
          <h3>Send Feedback To Us</h3>
          <form style={formStyle}>
            <input
              type='email'
              placeholder='Your email address'
              style={inputStyle}
              required
            />
            <button type='submit' style={buttonStyle}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}

const footerStyle = {
 marginTop:"5rem",
  background: '#F8D8DD',
  
  borderTop: '1px solid #ddd',
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  maxWidth: '1200px',
  margin: '0 auto',
  flexWrap: 'wrap',
}

const columnStyle = {
  flex: '1 1 200px', // Adjusts to your preferred column size
  padding: '10px',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'row',

}

const inputStyle = {
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
}

const buttonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  background: '#007bff',
  color: '#fff',
  cursor: 'pointer',
}

export default Footer
