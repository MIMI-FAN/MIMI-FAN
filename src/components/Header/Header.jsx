import { Link } from 'react-router-dom'
import './Header.css'

function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <Link to="/" className="logo">MIMI FAN</Link>
      <nav className="nav">
        <Link to="/clothes" className="nav-link">Clothes</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/cart" className="cart-button" aria-label="Shopping cart">
          <img src="/assets/icons/shoppingCart.svg" alt="Cart" className="cart-icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </nav>
    </header>
  )
}

export default Header
