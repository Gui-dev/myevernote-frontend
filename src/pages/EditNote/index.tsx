import React, { useEffect, useCallback, useState, FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { useNote } from '../../hooks/useNote'
import { RichText } from '../../components/RichText'
import { Load } from '../../components/Load'

import styles from './style.module.scss'

export const EditNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { findNoteById, loading, updateNote } = useNote()
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (id) {
      await updateNote(id, title, body)
      setTitle('')
      setBody('')
      navigate('/notes')
    }
  }

  return (
    <section className={styles.container}>
      <h1>Editar Post</h1>
      <Link to="/notes">
        <AiOutlineArrowLeft size={32} color="#FFF"/>
      </Link>
      <form
        className={styles.formUpdate}
        onSubmit={handleSubmit}
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
          <button className={styles.buttonConfirm}>
            {loading ? <Load height={32} width={32}/> : 'Atualizar Post'}
          </button>
        </div>
      </form>
    </section>
  )
}
