import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

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
        <img src={logoImg} alt="" />

        <div className={styles.buttonMenu} onClick={handleToggleMenu}>
          { isOpenMenu
            ? <FaTimes size={32} color="#FFF"/>
            : <FaBars size={32} color="#FFF"/>
          }
        </div>

        <ul className={`${styles.navbar} ${isOpenMenu ? styles.active : ''} `}>
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <a href="#">Item 1</a>
          </li>
        </ul>
      </header>

    </section>
  )
}
