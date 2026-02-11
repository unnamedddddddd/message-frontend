import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import { CreateServer, CreateUser, ForgotPassword, Home, Login, ProfileForm, VerifyEmail } from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/createServer" element={<CreateServer />} />
      </Routes>
    </Router>
  )
}

export default App