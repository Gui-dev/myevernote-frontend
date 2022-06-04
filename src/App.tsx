import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Contexts } from './contexts'
import { Header } from './components/Header'
import { RoutesNavigation } from './routes'

import 'react-toastify/dist/ReactToastify.css'

function App () {
  return (
    <Contexts>
      <BrowserRouter>
        <Header />
        <RoutesNavigation />
        <ToastContainer />
      </BrowserRouter>
    </Contexts>
  )
}

export default App
