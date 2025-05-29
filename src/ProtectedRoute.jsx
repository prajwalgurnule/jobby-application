// src/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = () => {
  const { authToken, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return authToken ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute