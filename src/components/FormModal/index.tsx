import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import ReactModal from 'react-modal'

import { RichText } from './../RichText'
import styles from './style.module.scss'

type FormModalProps = {
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export const FormModal = ({ isOpenModal, setIsOpenModal }: FormModalProps) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(title, body)
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
          <button className={styles.buttonConfirm}>Postar</button>
        </div>
      </form>
    </ReactModal>
  )
}
