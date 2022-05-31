import React, { Dispatch, SetStateAction } from 'react'
import ReactModal from 'react-modal'

import styles from './style.module.scss'

type FormModalProps = {
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export const FormModal = ({ isOpenModal, setIsOpenModal }: FormModalProps) => {
  const handleCloseModal = () => {
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

      >
        <input type="text" name="title" placeholder="Titulo" />

        <textarea name="body" placeholder="Conteúdo" />

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
