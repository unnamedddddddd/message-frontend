import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/HomeForm/Home'
import './App.css'
import Login from './pages/LoginForm/Login'
import CreateUser from './pages/CreateUser/CreateUser'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Profile from './pages/Profile/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  )
}

export default App