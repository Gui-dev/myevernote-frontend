import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import logoImg from './../../assets/images/logo-white.png'
import styles from './style.module.scss'

export const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleToggleMenu = () => {
    setIsOpenMenu(prev => !prev)
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Link to="/">
          <img src={logoImg} alt="" />
        </Link>

        <div className={styles.buttonMenu} onClick={handleToggleMenu}>
          { isOpenMenu
            ? <FaTimes size={32} color="#FFF"/>
            : <FaBars size={32} color="#FFF"/>
          }
        </div>

        <ul className={`${styles.navbar} ${isOpenMenu ? styles.active : ''} `}>
          <li>
            <Link to="/register">
              <a>Register</a>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      </header>

    </section>
  )
}
