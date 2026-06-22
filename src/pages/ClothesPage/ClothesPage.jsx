import { useEffect, useRef, useState } from 'react'
import ClothesCard from '../../components/ClothesCard/ClothesCard'
import ClothesLightroom from '../../components/ClothesLightroom/ClothesLightroom'
import './ClothesPage.css'

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
const AVAILABILITY = ['In Stock', 'Out of Stock']

function ClothesPage({ addToCart }) {
  const [clothes, setClothes] = useState([])
  const [openMenu, setOpenMenu] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    size: [],
    availability: [],
  })
  const barRef = useRef(null)

  useEffect(() => {
    fetch('/assets/clothes/clothes.json')
      .then((res) => res.json())
      .then((data) => setClothes(data.clothes))
      .catch(() => setClothes([]))
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const categories = [...new Set(clothes.flatMap((item) => item.category))]
  const brands = [...new Set(clothes.map((item) => item.brand))]

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu))
  }

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const values = prev[type]
      const next = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value]
      return { ...prev, [type]: next }
    })
  }

  const removeTag = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: prev[type].filter((v) => v !== value) }))
  }

  const resetFilters = () => {
    setFilters({ category: [], brand: [], size: [], availability: [] })
    setOpenMenu(null)
  }

  const selectedTags = Object.entries(filters).flatMap(([type, values]) =>
    values.map((value) => ({ type, value }))
  )

  const filteredClothes = clothes.filter((item) => {
    if (filters.category.length && !filters.category.some((c) => item.category.includes(c))) return false
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false
    if (filters.size.length && !filters.size.some((s) => item.size.includes(s))) return false
    if (filters.availability.length) {
      const status = item.inStock ? 'In Stock' : 'Out of Stock'
      if (!filters.availability.includes(status)) return false
    }
    return true
  })

  const renderFilter = (menu, label, options) => (
    <div className="filter">
      <button
        type="button"
        className={`filter-button ${filters[menu].length ? 'active' : ''}`}
        onClick={() => toggleMenu(menu)}
      >
        {filters[menu].length ? `${label} (${filters[menu].length})` : label}
      </button>
      {openMenu === menu && (
        <div className="dropdown">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className={`dropdown-item ${filters[menu].includes(option) ? 'selected' : ''}`}
              onClick={() => toggleFilter(menu, option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="clothes-page">
      <div className="filter-bar" ref={barRef}>
        <button type="button" className="filter-button" onClick={resetFilters}>All</button>
        {renderFilter('category', 'Category', categories)}
        {renderFilter('brand', 'Brand', brands)}
        {renderFilter('size', 'Size', SIZES)}
        {renderFilter('availability', 'Availability', AVAILABILITY)}
      </div>

      {selectedTags.length > 0 && (
        <div className="tag-container">
          {selectedTags.map(({ type, value }) => (
            <div className="tag" key={`${type}-${value}`}>
              <span>{value}</span>
              <button
                type="button"
                className="tag-remove"
                aria-label={`Remove ${value}`}
                onClick={() => removeTag(type, value)}
              >
                <img src="/assets/icons/cross.svg" alt="Remove" className="tag-cross" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="product-grid">
        {filteredClothes.map((item) => (
          <ClothesCard
            key={item.id}
            item={item}
            onAddToCart={addToCart}
            onCardClick={setSelectedItem}
          />
        ))}
      </div>

      <ClothesLightroom
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={addToCart}
      />
    </div>
  )
}

export default ClothesPage
