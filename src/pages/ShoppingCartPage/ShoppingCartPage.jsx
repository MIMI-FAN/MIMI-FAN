import { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import ClothesCard from '../../components/ClothesCard/ClothesCard'
import './ShoppingCartPage.css'

function ShoppingCartPage({ cartItems = [], removeFromCart }) {
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!showForm) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setShowForm(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [showForm])

  const downloadPdf = () => {
    const doc = new jsPDF()
    let y = 20
    doc.setFontSize(18)
    doc.text('Order Form', 14, y)
    doc.setFontSize(10)
    y += 8
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, y)
    y += 6
    doc.text(`Total items: ${cartItems.length}`, 14, y)
    y += 10

    doc.setFontSize(11)
    cartItems.forEach((item, index) => {
      if (y > 280) {
        doc.addPage()
        y = 20
      }
      doc.text(`${index + 1}. ${item.name || 'Untitled'}`, 14, y)
      y += 6
      doc.text(`UUID: ${item.id || '-'}    SKU: ${item.sku || '-'}`, 18, y)
      y += 10
    })

    doc.save('order-form.pdf')
  }

  return (
    <div className="shopping-cart-page">
      <button type="button" className="cart-form-button" onClick={() => setShowForm(true)}>
        Order Form
      </button>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
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
      )}

      {showForm && (
        <div className="form-overlay" onClick={() => setShowForm(false)}>
          <div className="form-window" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="form-close"
              aria-label="Close"
              onClick={() => setShowForm(false)}
            >
              <span className="form-close-icon"></span>
            </button>

            <h2 className="form-title">Order Form</h2>

            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <table className="form-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>UUID</th>
                    <th>SKU</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={`${item.id}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{item.name || 'Untitled'}</td>
                      <td>{item.id || '-'}</td>
                      <td>{item.sku || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button
              type="button"
              className="form-download"
              onClick={downloadPdf}
              disabled={cartItems.length === 0}
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingCartPage
