import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import { CreateUser, ForgotPassword, Home, Login, PersonalMessages, ProfileForm, VerifyEmail } from './pages'
import { NotificationProvider } from './providers/NotificationProvider'
import { GlobalNotiflication } from './components/global'
import { SocketProvider } from './providers/SocketProvider'
import { MainLayout } from './layouts'

function App() {
  return (
    <Router>
        <NotificationProvider>
          <GlobalNotiflication/>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                <Route element={<MainLayout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<ProfileForm />} />
                  <Route path="/personalMessages" element={<PersonalMessages />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/createUser" element={<CreateUser />} />
                <Route path="/verifyEmail" element={<VerifyEmail />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Routes>
        </NotificationProvider>
    </Router>
  )
}

export default App