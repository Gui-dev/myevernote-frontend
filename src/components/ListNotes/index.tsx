import React from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

import { CurrentNoteProps } from '../Notes'
import styles from './style.module.scss'

type ListNotesProps = {
  note: {
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
  setCurrentNote: React.Dispatch<React.SetStateAction<CurrentNoteProps | null>>
}

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

export const ListNotes = ({ note, setCurrentNote }: ListNotesProps) => {
  const handleSetsetCurrentNote = (note: NoteProps) => {
    setCurrentNote({
      id: note.id,
      title: note.title,
      body: note.body,
      created_at: note.created_at
    })
  }

  return (
    <section className={styles.container}>
      <div className={styles.listItem}>
        <article
          className={styles.note}
          onClick={ () => handleSetsetCurrentNote(note) }
        >
          <h1 className={styles.noteTitle}>{note.titleFormatted}</h1>
          <div
            className={styles.noteBody}
            dangerouslySetInnerHTML={{ __html: note.bodyFormatted }}
          />
          <time>{note.dateFormatted}</time>

          <div className={styles.actionButtons}>
            <button
              className={styles.actionEdit}
            >
              <AiOutlineEdit size={18} color="#008F8C"/>
            </button>
            <button
              className={styles.actionDelete}
            >
              <AiOutlineDelete size={18} color="#F2668B"/>
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}
