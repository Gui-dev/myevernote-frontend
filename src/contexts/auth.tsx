import { AxiosError } from 'axios'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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
  updatePersonalInformation: (name: string, email: string) => Promise<void>
  updatePassword: (password: string, confirmPassword: string) => Promise<void>
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
    loadUser()
  }, [])

  const loadUser = async () => {
    const user = localStorage.getItem('myevernote:user')
    const token = localStorage.getItem('myevernote:token')

    if (user && token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setUser(JSON.parse(user))
    }
  }

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

  const updatePersonalInformation = async (name: string, email: string) => {
    try {
      setLoading(true)
      if (name === '' || email === '') {
        toast.error('Nome e E-mail devem ser preechindos')
        return
      }

      const { data } = await api.put('/users/edit', {
        name,
        email
      })

      localStorage.removeItem('myevernote:user')
      localStorage.setItem('myevernote:user', JSON.stringify(data))
      setUser(data.user)
      toast.success('Informações atualizadas com sucesso')
      await loadUser()
    } catch (error) {
      console.log(error)
      toast.error('Erro ao atualizar informações')
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (password: string, confirmPassword: string) => {
    try {
      setLoading(true)
      if (password === '' || confirmPassword === '') {
        toast.warning('Campo senha e confirmar senha devem ser preenchidos')
        return
      }
      if (password !== confirmPassword) {
        toast.error('As senhas não combinam')
        return
      }
      if (password.length < 6) {
        toast.error('A senha deve ter no minimo 6 caracteres')
        return
      }

      toast.success('A senha foi atualizada com sucesso')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signIn,
      signOut,
      updatePersonalInformation,
      updatePassword
    }}>
      { children }
    </AuthContext.Provider>
  )
}
