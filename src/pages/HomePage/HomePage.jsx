import { Link } from 'react-router-dom'
import ClothesCard from '../../components/ClothesCard/ClothesCard'
import './HomePage.css'

function HomePage({ addToCart }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-text">
          <h1>Placeholder</h1>
          <p>Placeholder</p>
        </div>
      </section>

      <section className="products">
        <div className="product-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <ClothesCard
              key={index}
              item={{ id: `home-${index}`, name: `Placeholder ${index + 1}` }}
              onAddToCart={addToCart}
            />
          ))}
        </div>
        <div className="view-more">
          <Link to="/clothes" className="view-more-button">View More</Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
