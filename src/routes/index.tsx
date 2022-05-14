import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Auth } from '../pages/Auth'
import { Register } from '../pages/Register'
import { Notes } from '../pages/Notes'
import { User } from '../pages/User'

export const RoutesNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ <Auth /> }/>
      <Route path="/register" element={ <Register /> }/>
      <Route path="/notes" element={ <Notes /> }/>
      <Route path="/users/edit" element={ <User /> }/>
    </Routes>
  )
}
