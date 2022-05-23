import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import logoImg from './../../assets/images/logo-white.png'
import styles from './style.module.scss'

import { useAuth } from '../../hooks/useAuth'

export const Header = () => {
  const { signOut, user } = useAuth()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleToggleMenu = () => {
    setIsOpenMenu(prev => !prev)
  }

  const handleLogout = () => {
    signOut()
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
          {
            user
              ? (
                <>
                  <li>
                    <Link to="/notes">
                      Notes
                    </Link>
                  </li>
                  <li>
                    <Link to="/users/edit">
                      Profile
                    </Link>
                  </li>
                  <li className={styles.buttonLogout}>
                    <button onClick={ handleLogout }>
                      Sair
                    </button>
                  </li>
                </>
                )
              : (
                <>
                  <li>
                    <Link to="/register">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                </>
                )
          }

        </ul>
      </header>

    </section>
  )
}
