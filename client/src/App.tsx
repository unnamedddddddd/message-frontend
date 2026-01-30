import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/HomeForm/Home'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App