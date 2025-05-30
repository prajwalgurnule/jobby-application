// src/components/Header.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const { authToken, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Check if current route matches the nav link
  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 shadow-lg py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <span className="text-3xl font-extrabold text-white group-hover:text-yellow-300 transition-all duration-300">
            Jobby
          </span>
          <span className="hidden md:inline-block w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
        </Link>
        
        <nav className="flex items-center space-x-4 md:space-x-8">
          <Link
            to="/"
            className={`relative px-2 py-1 text-white font-medium transition-all duration-300 ${isActive('/') ? 
              'text-yellow-300 scale-105' : 
              'hover:text-yellow-200 hover:scale-105'}`}
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 rounded-full"></span>
            )}
          </Link>
          
          {authToken && (
            <Link
              to="/jobs"
              className={`relative px-2 py-1 text-white font-medium transition-all duration-300 ${isActive('/jobs') ? 
                'text-yellow-300 scale-105' : 
                'hover:text-yellow-200 hover:scale-105'}`}
            >
              Jobs
              {isActive('/jobs') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 rounded-full"></span>
              )}
            </Link>
          )}
          
          <ThemeToggle className="ml-4" />
          
          {authToken ? (
            <button
              onClick={handleLogout}
              className="bg-white dark:bg-gray-700 text-blue-600 dark:text-white hover:bg-yellow-300 hover:text-blue-800  px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ml-4"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`bg-white dark:bg-gray-700 text-blue-600 dark:text-white hover:bg-yellow-300 hover:text-blue-800 px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ml-4 ${
                isActive('/login') ? 'ring-2 ring-yellow-300' : ''
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header