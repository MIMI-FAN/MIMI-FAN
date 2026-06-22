import './ClothesCard.css'

function ClothesCard({ item, onAddToCart, onRemove, onCardClick }) {
  const mainImage = item?.filePath?.main
  const imageSrc = mainImage ? (mainImage.startsWith('/') ? mainImage : `/${mainImage}`) : null

  const brand = item?.brand
  const hasBrand = brand && brand.toLowerCase() !== 'unknown'

  return (
    <div className="clothes-card" onClick={() => onCardClick?.(item)}>
      <div className="clothes-card-media">
        {imageSrc && <img src={imageSrc} alt={item?.name || ''} className="clothes-card-image" />}
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
  )
}

export default ClothesCard
