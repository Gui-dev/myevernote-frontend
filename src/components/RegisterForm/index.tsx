import React, { FormEvent, useState } from 'react'
import { FaLock, FaMailBulk, FaUserAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import styles from './style.module.scss'
import { api } from '../../services/api'
import { Load } from '../Load'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      setLoading(true)
      if (name === '' || email === '' || password === '') {
        setError('todos os campos devem ser preenchidos')
        return
      }

      await api.post('/users/register', {
        name,
        email,
        password
      })

      navigate('/login')
    } catch (error) {
      const err = error as AxiosError

      if (err.response?.status === 400) {
        setError('Este e-mail já foi cadastrado, tente outro e-mail')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.container} onSubmit={ handleSubmit }>
      { error && (
        <div className={styles.messageError}>
          { error }
        </div>
      ) }

      <div className={styles.inputGroup}>
        <FaUserAlt size={18} color="#FFF"/>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <FaMailBulk size={18} color="#FFF"/>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <FaLock size={18} color="#FFF"/>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button>
          {
            loading ? <Load height={32} width={32}/> : 'Cadastrar'
          }
        </button>
        <Link to="/login">
          Já tenho uma conta, fazer login
        </Link>
      </div>
    </form>
  )
}
