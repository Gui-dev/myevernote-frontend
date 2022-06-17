import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import ReactModal from 'react-modal'

import { useNote } from './../../hooks/useNote'
import { RichText } from './../RichText'
import { Load } from '../Load'

import styles from './style.module.scss'

type FormModalProps = {
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export const FormModal = ({ isOpenModal, setIsOpenModal }: FormModalProps) => {
  const { createNote, loading } = useNote()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await createNote(title, body)
    setTitle('')
    setBody('')
    setIsOpenModal(false)
  }

  return (
    <ReactModal
      isOpen={isOpenModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <form
        className={styles.container}
        onSubmit={ handleSubmit }
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
          <button
            className={styles.buttonCancel}
            onClick={handleCloseModal}
          >
              Cancelar
          </button>
          <button className={styles.buttonConfirm}>
            {loading ? <Load height={32} width={32}/> : 'Postar'}
          </button>
        </div>
      </form>
    </ReactModal>
  )
}
