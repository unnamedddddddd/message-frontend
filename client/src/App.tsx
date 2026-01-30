import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/HomeForm/Home'
import './App.css'
import Login from './components/LoginForm/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App