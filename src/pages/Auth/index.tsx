import React from 'react'
import { LoginForm } from '../../components/LoginForm'

import logoImg from './../../assets/images/note_login.png'
import styles from './style.module.scss'

export const Auth = () => {
  return (
    <section className={styles.container}>
      <header>
        <img src={logoImg} alt="" />
        <h1>Your notes on the cloud</h1>
      </header>

      <div className={styles.contentForm}>
        <LoginForm />
      </div>
    </section>

  )
}
