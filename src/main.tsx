import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal'

import App from './App'

import './main.scss'

Modal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
