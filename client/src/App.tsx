import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import { CreateUser, ForgotPassword, Home, Login, PersonalMessages, ProfileForm, VerifyEmail } from './pages'
import { NotificationProvider } from './providers/NotificationProvider'
import { GlobalNotiflication } from './components/global'
import { SocketProvider } from './providers/SocketProvider'

function App() {
  return (
    <Router>
      <SocketProvider>
        <NotificationProvider>
          <GlobalNotiflication/>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/createUser" element={<CreateUser />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/verifyEmail" element={<VerifyEmail />} />
              <Route path="/personalMessages" element={<PersonalMessages />} />
            </Routes>
        </NotificationProvider>
      </SocketProvider>
    </Router>
  )
}

export default App