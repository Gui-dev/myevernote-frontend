import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaLock, FaMailBulk, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'

export const User = () => {
  return (
    <section className={styles.container}>
      <Link to="/notes">
        <AiOutlineArrowLeft size={32} color="#FFF"/>
      </Link>
      <div className={styles.personalInformation}>
        <h1>Informações pessoais</h1>
        <form>
          <div className={styles.inputGroup}>
            <FaUserAlt size={18} color="#FFF"/>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <FaMailBulk size={18} color="#FFF"/>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              // value={email}
              // onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button className={styles.buttonSubmit}>Atualizar</button>
        </form>
      </div>

      <div className={styles.fieldPassword}>
        <h1>Alterar a Senha</h1>
        <form>
          <div className={styles.inputGroup}>
            <FaLock size={18} color="#FFF"/>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              // value={password}
              // onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <FaLock size={18} color="#FFF"/>
            <input
              type="password"
              name="confirPassword"
              placeholder="Confirmar Senha"
              // value={password}
              // onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className={styles.buttonSubmit}>Atualizar</button>
        </form>
      </div>
    </section>
  )
}
