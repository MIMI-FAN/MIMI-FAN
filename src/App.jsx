import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import ClothesPage from './pages/ClothesPage/ClothesPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import './App.css'

const CART_STORAGE_KEY = 'mimi-fan-cart'

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item])
  }

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartItems.length} />
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/clothes" element={<ClothesPage addToCart={addToCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/cart"
            element={<ShoppingCartPage cartItems={cartItems} removeFromCart={removeFromCart} />}
          />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
