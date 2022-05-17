import React from 'react'

import logoImg from './../../assets/images/logo-white.png'
import styles from './style.module.scss'

import { RegisterForm } from '../../components/RegisterForm'

export const Register = () => {
  return (
    <section className={styles.container}>
      <header>
        <img src={logoImg} alt="" />
        <h1>Your notes on the cloud</h1>
      </header>

      <div className={styles.contentForm}>
        <RegisterForm />
      </div>
    </section>
  )
}
