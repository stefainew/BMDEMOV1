import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[#C9A84C] animate-pulse" />
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return <Outlet />
}
