import { AxiosError } from 'axios'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '../services/api'

type User = {
  id: string
  name: string
  email: string
  created_at: string
}

type AuthContextProps = {
  user: User | null
  loading: boolean
  error: string
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUser = () => {
      const user = localStorage.getItem('myevernote:user')
      const token = localStorage.getItem('myevernote:token')

      if (user && token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        setUser(JSON.parse(user))
      }
    }
    loadUser()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      if (email === '' || password === '') {
        setError('Todos os campos devem ser preenchidos')
        return
      }
      const { data } = await api.post('/users/login', {
        email,
        password
      })

      localStorage.setItem('myevernote:user', JSON.stringify(data.user))
      localStorage.setItem('myevernote:token', data.token)

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`
      setUser(data.user)
    } catch (error) {
      const err = error as AxiosError

      if (err.response?.status === 401) {
        setError('E-mail ou senha inválidos')
        return
      }

      setError('Algo deu errado, tente novamente mais tarde')
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem('myevernote:user')
    localStorage.removeItem('myevernote:token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signIn,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  )
}
