import React, { useState } from 'react'
import { FaLock, FaMailBulk } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className={styles.container} >
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
          Login
        </button>
        <Link to="/register">
          Ainda não tem uma conta? Cadastrar
        </Link>
      </div>
    </form>
  )
}
