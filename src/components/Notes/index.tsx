import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiFillPlusCircle } from 'react-icons/ai'

import { api } from '../../services/api'
import styles from './style.module.scss'
import { ListNotes } from '../ListNotes'

type NoteProps = {
  id: string
  title: string
  titleFormatted: string
  body: string
  bodyFormatted: string
  created_at: string
  dateFormatted: string
  author: {
    id: string
    name: string
    email: string
    created_at: string
  }
}

export type CurrentNoteProps = {
  id: string
  title: string
  body: string
  created_at: string
}

export const NotesComponent = () => {
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [currentNote, setCurrentNote] = useState<CurrentNoteProps | null>(null)
  const [isOpenToogleMenu, setIsOpenToogleMenu] = useState(true)

  useEffect(() => {
    const loadNotes = async () => {
      const { data } = await api.get('/notes')
      const dataFormatted = data.map((note: NoteProps) => {
        return {
          ...note,
          titleFormatted: note.title.substring(0, 15),
          bodyFormatted: note.body.substring(0, 40),
          dateFormatted: format(new Date(note.created_at), 'dd/MM/yyyy', { locale: ptBr })
        }
      })

      setNotes(dataFormatted.reverse())
    }
    loadNotes()
  }, [])

  const handleToggleMenu = () => {
    setIsOpenToogleMenu(prev => !prev)
  }

  const handleisOpenCreateNote = () => {
    console.log('Here')
  }

  return (
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
          onClick={handleisOpenCreateNote}
        >
          <AiFillPlusCircle size={42} color="#0FC2C0"/>
        </button>
      </>
      <aside className={`${styles.listNotes} ${isOpenToogleMenu ? styles.active : ''}`}>
        <p>Search</p>
        { notes.map(note => {
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
            ? <h1>NOTES</h1>
            : <h1>HERE</h1>
        }
      </div>
    </section>
  )
}
