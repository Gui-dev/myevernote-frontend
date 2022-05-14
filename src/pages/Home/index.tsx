import React from 'react'
import { Link } from 'react-router-dom'

import presentationImg from './../../assets/images/presentation.png'
import styles from './style.module.scss'

export const Home = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Create notes easily and access when you wants on the cloud</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptate asperiores, laborum itaque laboriosam adipisci perspiciatis recusandae.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptate asperiores, laborum itaque laboriosam adipisci perspiciatis recusandae.
        </p>
        <Link to="/register">
          Register for free now
        </Link>
      </header>

      <div className={styles.content}>
        <img src={presentationImg} alt="" />
      </div>
    </section>
  )
}
