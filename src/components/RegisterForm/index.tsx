import React, { FormEvent, useState } from 'react'
import { FaLock, FaMailBulk, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'

export const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(name, email, password)
  }

  return (
    <form className={styles.container} onSubmit={ handleSubmit }>
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
        <button>Cadastrar</button>
        <Link to="/login">
          Já tenho uma conta, fazer login
        </Link>
      </div>
    </form>
  )
}
