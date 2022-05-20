import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

export const PublicRoutes = () => {
  const { user } = useAuth()

  return user ? <Navigate to="/notes"/> : <Outlet />
}
