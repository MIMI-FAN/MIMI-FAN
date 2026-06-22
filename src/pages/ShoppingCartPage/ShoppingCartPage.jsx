import { Link } from 'react-router-dom'
import ClothesCard from '../../components/ClothesCard/ClothesCard'
import './ShoppingCartPage.css'

function ShoppingCartPage({ cartItems = [], removeFromCart }) {
  return (
    <div className="shopping-cart-page">
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="product-grid">
            {cartItems.map((item, index) => (
              <ClothesCard
                key={`${item.id}-${index}`}
                item={item}
                showAddButton={false}
                onRemove={() => removeFromCart(index)}
              />
            ))}
          </div>

          <div className="cart-checkout">
            <Link to="/checkout" className="cart-checkout-button">
              Check out
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default ShoppingCartPage
