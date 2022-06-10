import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { Home } from '../pages/Home'
import { Auth } from '../pages/Auth'
import { Register } from '../pages/Register'
import { Notes } from '../pages/Notes'
import { EditNote } from '../pages/EditNote'
import { User } from '../pages/User'

export const RoutesNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoutes />}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Auth />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Route>

      <Route path="/" element={ <PrivateRoutes /> }>
        <Route
          path="/notes"
          element={<Notes />}
        />
        <Route
          path="/notes/edit/:id"
          element={<EditNote />}
        />
        <Route
          path="/users/edit/:id"
          element={<User />}
        />
      </Route>

    </Routes>
  )
}
