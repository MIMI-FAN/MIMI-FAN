import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import WorksPage from './pages/WorksPage/WorksPage'
import ContactPage from './pages/ContactPage/ContactPage'
import './App.css'

function App() {
  const [sortProps, setSortProps] = useState(null)

  const handleSortStateChange = (newSortProps) => {
    setSortProps(newSortProps)
  }

  return (
    <Router>
      <div className="App">
        <Header
          sortCriteria={sortProps?.sortCriteria}
          showSortMenu={sortProps?.showSortMenu}
          onSortClick={sortProps?.onSortClick}
          onSortSelect={sortProps?.onSortSelect}
          onMouseEnter={sortProps?.onMouseEnter}
          onMouseLeave={sortProps?.onMouseLeave}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage onSortStateChange={handleSortStateChange} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
