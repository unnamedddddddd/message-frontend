import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/HomeForm/Home'
import './App.css'
import Login from './components/LoginForm/Login'
import CreateUser from './components/CreateUser/CreateUser'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App