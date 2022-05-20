import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './contexts/auth'
import { Header } from './components/Header'
import { RoutesNavigation } from './routes'

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <RoutesNavigation />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
