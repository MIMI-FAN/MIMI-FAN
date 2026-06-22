import { useEffect } from 'react'
import './ClothesLightroom.css'

function ClothesLightroom({ item, onClose, onAddToCart }) {
  useEffect(() => {
    if (!item) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  const toSrc = (p) => (p.startsWith('/') ? p : `/${p}`)
  const images = [item.filePath?.main, ...(item.filePath?.additional || [])].filter(Boolean)

  return (
    <div className="lightroom-overlay" onClick={onClose}>
      <div className="lightroom-window" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightroom-close" aria-label="Close" onClick={onClose}>
          <span className="lightroom-close-icon"></span>
        </button>

        <div className="lightroom-images">
          {images.map((src, index) => (
            <img key={index} src={toSrc(src)} alt={item.name || ''} />
          ))}
        </div>

        <div className="lightroom-info">
          {item.name && <h2 className="lightroom-name">{item.name}</h2>}
          {item.price && <p className="lightroom-price">${item.price}</p>}
          {item.brand && <p className="lightroom-row">Brand: {item.brand}</p>}
          {item.color && <p className="lightroom-row">Color: {item.color}</p>}
          {item.material && <p className="lightroom-row">Material: {item.material}</p>}
          <p className="lightroom-row">{item.inStock ? 'In Stock' : 'Out of Stock'}</p>

          {item.category?.length > 0 && (
            <div className="lightroom-tags">
              {item.category.map((c) => (
                <span className="lightroom-tag" key={c}>{c}</span>
              ))}
            </div>
          )}

          {item.size?.length > 0 && (
            <div className="lightroom-tags">
              {item.size.map((s) => (
                <span className="lightroom-tag" key={s}>{s}</span>
              ))}
            </div>
          )}

          {item.description && <p className="lightroom-description">{item.description}</p>}
        </div>

        <button
          type="button"
          className="lightroom-add-to-cart"
          aria-label="Add to cart"
          onClick={() => onAddToCart?.(item)}
        >
          <span className="lightroom-add-to-cart-icon"></span>
        </button>
      </div>
    </div>
  )
}

export default ClothesLightroom
