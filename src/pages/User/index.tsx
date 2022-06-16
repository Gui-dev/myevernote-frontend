import React, { FormEvent, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaLock, FaMailBulk, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import styles from './style.module.scss'

export const User = () => {
  const { user, updatePersonalInformation, updatePassword } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdatePersonalInformation = async (event: FormEvent) => {
    event.preventDefault()
    await updatePersonalInformation(name, email)
  }

  const handleUpdatePassword = async (event: FormEvent) => {
    event.preventDefault()
    await updatePassword(password, confirmPassword)
  }

  return (
    <section className={styles.container}>
      <Link to="/notes">
        <AiOutlineArrowLeft size={32} color="#FFF"/>
      </Link>
      <div className={styles.personalInformation}>
        <h1>Informações pessoais</h1>
        <form onSubmit={handleUpdatePersonalInformation}>
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

          <button
            type="submit"
            className={styles.buttonSubmit}
          >
            Atualizar Perfil
          </button>
        </form>
      </div>

      <div className={styles.fieldPassword}>
        <h1>Alterar a Senha</h1>
        <form onSubmit={handleUpdatePassword}>
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

          <div className={styles.inputGroup}>
            <FaLock size={18} color="#FFF"/>
            <input
              type="password"
              name="confirPassword"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles.buttonSubmit}
          >
            Atualizar Senha
          </button>
        </form>
      </div>
    </section>
  )
}
