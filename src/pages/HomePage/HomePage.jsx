import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { Link } from 'react-router-dom'
import ClothesCard from '../../components/ClothesCard/ClothesCard'
import './HomePage.css'

function HomePage({ addToCart }) {
  const [clothes, setClothes] = useState([])
  const heroRef = useRef(null)

  useEffect(() => {
    fetch('/assets/clothes/clothes.json')
      .then((res) => res.json())
      .then((data) => setClothes(data.clothes))
      .catch(() => setClothes([]))
  }, [])

  useEffect(() => {
    if (heroRef.current) {
      animate(heroRef.current, { opacity: [0, 1], duration: 1200, ease: 'outQuad' })
    }
  }, [])

  return (
    <div className="home-page">
      <section className="hero" ref={heroRef}>
        <div className="hero-text">
          <h1>Placeholder</h1>
          <p>Placeholder</p>
        </div>
      </section>

      <section className="products">
        <div className="product-grid">
          {clothes.slice(0, 8).map((item) => (
            <ClothesCard key={item.id} item={item} onAddToCart={addToCart} />
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
