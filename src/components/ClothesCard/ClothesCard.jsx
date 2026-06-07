import './ClothesCard.css'

function ClothesCard({ item, onAddToCart, showAddButton = true, onRemove }) {
  return (
    <div className="clothes-card">
      {showAddButton && (
        <button
          type="button"
          className="add-to-cart"
          aria-label="Add to cart"
          onClick={() => onAddToCart(item)}
        >
          <span className="add-to-cart-icon"></span>
        </button>
      )}
      {onRemove && (
        <button
          type="button"
          className="remove-item"
          aria-label="Remove item"
          onClick={onRemove}
        >
          <span className="remove-item-icon"></span>
        </button>
      )}
    </div>
  )
}

export default ClothesCard
