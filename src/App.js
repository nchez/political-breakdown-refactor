import Stock from './pages/Stock'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/stocks/:symbol" element={<Stock />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
