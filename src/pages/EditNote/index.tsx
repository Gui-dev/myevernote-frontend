import React, { useEffect, useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { useNote } from '../../hooks/useNote'
import styles from './style.module.scss'
import { RichText } from '../../components/RichText'

export const EditNote = () => {
  const { id } = useParams()
  const { findNoteById } = useNote()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleFindNoteById = useCallback(async () => {
    if (id) {
      const data = await findNoteById(id)

      if (data) {
        setTitle(data.title)
        setBody(data.body)
      }
    }
  }, [id, findNoteById])

  useEffect(() => {
    handleFindNoteById()
  }, [handleFindNoteById])

  console.log(body)

  return (
    <section className={styles.container}>
      <h1>Editar Post</h1>
      <Link to="/notes">
        <AiOutlineArrowLeft size={32} color="#FFF"/>
      </Link>
      <form
        className={styles.formUpdate}
      >
        <input
          type="text"
          name="title"
          placeholder="Titulo"
          value={title}
          onChange={ event => setTitle(event.target.value) }
        />

        <RichText
          note={body}
          setBody={setBody}
        />

        <div className={styles.groupButtons}>
          <button className={styles.buttonConfirm}>Atualizar Post</button>
        </div>
      </form>
    </section>
  )
}