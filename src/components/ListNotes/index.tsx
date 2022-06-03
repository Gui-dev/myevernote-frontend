import React from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { useNote } from '../../hooks/useNote'
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
  const { deleteNote } = useNote()

  const handleSetCurrentNote = (note: NoteProps) => {
    setCurrentNote({
      id: note.id,
      title: note.title,
      body: note.body,
      created_at: note.dateFormatted
    })
  }

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id)
  }

  return (
    <section className={styles.container}>
      <div className={styles.listItem}>
        <article
          className={styles.note}
          onClick={ () => handleSetCurrentNote(note) }
        >
          <h1 className={styles.noteTitle}>{note.titleFormatted}</h1>
          <div
            className={styles.noteBody}
            dangerouslySetInnerHTML={{ __html: note.bodyFormatted }}
          />
          <time>{note.dateFormatted}</time>

          <div className={styles.actionButtons}>
            <Link
              to={`/notes/edit/${note.id}`}
              className={styles.actionEdit}
            >
              <AiOutlineEdit size={18} color="#008F8C"/>
            </Link>
            <button
              className={styles.actionDelete}
              onClick={() => handleDeleteNote(note.id)}
            >
              <AiOutlineDelete size={18} color="#F2668B"/>
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}
