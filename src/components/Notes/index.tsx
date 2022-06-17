import React, { useState } from 'react'

import noteImg from './../../assets/images/note_login.png'

import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiFillPlusCircle,
  AiOutlineSearch
} from 'react-icons/ai'

import styles from './style.module.scss'
import { ListNotes } from '../ListNotes'
import { ContentNote } from '../ContentNote'
import { FormModal } from '../FormModal'
import { useNote } from '../../hooks/useNote'
import { Load } from '../Load'

export type CurrentNoteProps = {
  id: string
  title: string
  body: string
  created_at: string
}

export const NotesComponent = () => {
  const { loading, notes, searchNotes } = useNote()
  const [currentNote, setCurrentNote] = useState<CurrentNoteProps | null>(null)
  const [isOpenToogleMenu, setIsOpenToogleMenu] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [search, setSearch] = useState('')

  const handleToggleMenu = () => {
    setIsOpenToogleMenu(prev => !prev)
  }

  const handleIsOpenModal = () => {
    setIsOpenModal(prev => !prev)
  }

  const handleSearchNote = () => {
    if (search.length > 2) {
      searchNotes(search)
      setSearch('')
    }
  }

  if (loading) {
    return (
      <div className="loadingContainer">
        <Load height={60} width={60}/>
      </div>
    )
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
          <>
            <div className={styles.search}>
              <input
                type="text"
                title="Busque uma nota por conteúdo"
                placeholder="Buscar"
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
              <button
                onClick={ handleSearchNote }
              >
                <AiOutlineSearch size={16} color="#FFF"/>
              </button>
            </div>
            <section className={styles.containerList}>
              <div className={styles.listItem}>

                { notes?.map(note => {
                  return (

                    <ListNotes
                      key={ String(note.id) }
                      note={ note }
                      setCurrentNote={ setCurrentNote }
                    />

                  )
                }) }
              </div>
            </section>
          </>
        </aside>

        <div className={`${styles.content} ${isOpenToogleMenu ? styles.active : ''}`}>
          {
            currentNote
              ? <ContentNote currentNote={currentNote}/>
              : <div className={styles.containerContent}>
                  <h1 className={styles.titleContent}>
                    Selecione uma nota ao lado
                  </h1>
                  <img src={noteImg} alt="Bloco de notas" />
                </div>
          }
        </div>
      </section>
    </>
  )
}
