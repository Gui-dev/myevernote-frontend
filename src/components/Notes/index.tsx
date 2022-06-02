import React, { useState } from 'react'

import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiFillPlusCircle } from 'react-icons/ai'

import styles from './style.module.scss'
import { ListNotes } from '../ListNotes'
import { ContentNote } from '../ContentNote'
import { FormModal } from '../FormModal'
import { useNote } from '../../hooks/useNote'

export type CurrentNoteProps = {
  id: string
  title: string
  body: string
  created_at: string
}

export const NotesComponent = () => {
  const { notes } = useNote()
  const [currentNote, setCurrentNote] = useState<CurrentNoteProps | null>(null)
  const [isOpenToogleMenu, setIsOpenToogleMenu] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleMenu = () => {
    setIsOpenToogleMenu(prev => !prev)
  }

  const handleIsOpenModal = () => {
    setIsOpenModal(prev => !prev)
  }

  return (
    <>
      <FormModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <section className={styles.container}>
        <>
          <button
            className={`${styles.menu} ${isOpenToogleMenu ? styles.active : ''}`}
            onClick={handleToggleMenu}
          >
            {
              isOpenToogleMenu
                ? <AiOutlineMenuFold size={22} color="#FFF"/>
                : <AiOutlineMenuUnfold size={22} color="#FFF"/>
            }
          </button>
          <button
            className={styles.plus}
            onClick={handleIsOpenModal}
          >
            <AiFillPlusCircle size={42} color="#0FC2C0"/>
          </button>
        </>
        <aside className={`${styles.listNotes} ${isOpenToogleMenu ? styles.active : ''}`}>
          <p>Search</p>
          { notes?.map(note => {
            return (
              <ListNotes
                key={ String(note.id) }
                note={ note }
                setCurrentNote={ setCurrentNote }
              />
            )
          }) }
        </aside>

        <div className={`${styles.content} ${isOpenToogleMenu ? styles.active : ''}`}>
          {
            currentNote
              ? <ContentNote currentNote={currentNote}/>
              : <h1>HERE</h1>
          }
        </div>
      </section>
    </>
  )
}
