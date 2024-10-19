import { FaShoppingCart } from 'react-icons/fa'
import { Badge } from 'react-bootstrap'

const CartButton = ({ cartItems, toggleCart }) => {
  return (
    <button onClick={toggleCart} className='cart-button'>
      <FaShoppingCart /> Cart
      {cartItems.length > 0 && (
        <Badge pill bg='danger' style={{ marginLeft: '5px' }}>
          {cartItems.reduce((a, c) => a + c.qty, 0)}
        </Badge>
      )}
    </button>
  )
}

export default CartButton
