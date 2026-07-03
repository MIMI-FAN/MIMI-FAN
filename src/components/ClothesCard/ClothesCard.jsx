import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import './ClothesCard.css'

function ClothesCard({ item, onAddToCart, onRemove, onCardClick }) {
  const mainImage = item?.filePath?.main
  const imageSrc = mainImage ? (mainImage.startsWith('/') ? mainImage : `/${mainImage}`) : null

  const brand = item?.brand
  const hasBrand = brand && brand.toLowerCase() !== 'unknown'

  const cardRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return undefined
    el.style.opacity = '0'
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(el, {
              opacity: [0, 1],
              translateY: [24, 0],
              duration: 600,
              ease: 'outQuad',
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="clothes-card" onClick={() => onCardClick?.(item)}>
      <div className="clothes-card-inner" ref={cardRef}>
        <div className="clothes-card-media">
          {!loaded && <div className="clothes-card-loading">loading...</div>}
          {imageSrc && (
            <img
              src={imageSrc}
              alt={item?.name || ''}
              className="clothes-card-image"
              style={{ opacity: loaded ? 1 : 0 }}
              onLoad={() => setLoaded(true)}
            />
          )}
          {onAddToCart && (
            <button
              type="button"
              className="add-to-cart"
              aria-label="Add to cart"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(item)
              }}
            >
              <span className="add-to-cart-icon"></span>
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              className="remove-item"
              aria-label="Remove item"
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
            >
              <span className="remove-item-icon"></span>
            </button>
          )}
        </div>
        <div className="clothes-card-info">
          {hasBrand && <span className="clothes-card-brand">{brand}</span>}
          <span className="clothes-card-name">{item?.name}</span>
        </div>
      </div>
    </div>
  )
}

export default ClothesCard
