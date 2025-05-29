// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './ProtectedRoute'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobItem from './pages/JobItem'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-blue-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobItem />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App