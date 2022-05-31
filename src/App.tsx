import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Contexts } from './contexts'
import { Header } from './components/Header'
import { RoutesNavigation } from './routes'

function App () {
  return (
    <Contexts>
      <BrowserRouter>
        <Header />
        <RoutesNavigation />
      </BrowserRouter>
    </Contexts>
  )
}

export default App
