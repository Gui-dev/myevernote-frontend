import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './components/Header'
import { RoutesNavigation } from './routes'

function App () {
  const user = true
  return (
    <BrowserRouter>
      {user && (
        <Header />
      )}
      <RoutesNavigation />
    </BrowserRouter>
  )
}

export default App
