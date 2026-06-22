import { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import './CheckoutPage.css'

function CheckoutPage({ cartItems = [] }) {
  const [showForm, setShowForm] = useState(false)
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  })

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails((prev) => ({ ...prev, [name]: value }))
  }

  const downloadPdf = () => {
    const doc = new jsPDF()
    let y = 20
    doc.setFontSize(18)
    doc.text('Order Form', 14, y)
    doc.setFontSize(10)
    y += 8
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, y)
    y += 8
    doc.text(`Name: ${details.firstName} ${details.lastName}`.trim(), 14, y)
    y += 6
    doc.text(`Phone: ${details.phone || '-'}`, 14, y)
    y += 6
    doc.text(`Address: ${details.address || '-'}`, 14, y)
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
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <div className="checkout-row">
          <label className="checkout-field">
            <span>First name</span>
            <input
              type="text"
              name="firstName"
              value={details.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="checkout-field">
            <span>Last name</span>
            <input
              type="text"
              name="lastName"
              value={details.lastName}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="checkout-field">
          <span>Phone</span>
          <input type="tel" name="phone" value={details.phone} onChange={handleChange} />
        </label>

        <label className="checkout-field">
          <span>Mailing address</span>
          <input type="text" name="address" value={details.address} onChange={handleChange} />
        </label>
      </form>

      <button type="button" className="checkout-button" onClick={() => setShowForm(true)}>
        Check out
      </button>

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

            <div className="form-body">
              <div className="form-qr-wrap">
                <div className="form-qr">QR Code</div>
                <p className="form-wechat">WeChat: MIMIFAN-Mi</p>
              </div>

              <div className="form-content">
                <h2 className="form-title">Order Form</h2>

                <div className="form-details">
                  <p>Name: {`${details.firstName} ${details.lastName}`.trim() || '-'}</p>
                  <p>Phone: {details.phone || '-'}</p>
                  <p>Address: {details.address || '-'}</p>
                </div>

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
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
