// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jobby_jwt')
    if (token) {
      setAuthToken(token)
    }
    setIsLoading(false)
  }, [])

  const login = (token) => {
    localStorage.setItem('jobby_jwt', token)
    setAuthToken(token)
    navigate('/jobs')
  }

  const logout = () => {
    localStorage.removeItem('jobby_jwt')
    setAuthToken(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)