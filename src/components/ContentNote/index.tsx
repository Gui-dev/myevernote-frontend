import React from 'react'

import styles from './style.module.scss'

type ContentNoteProps = {
  currentNote: {
    id: string
    title: string
    body: string
    created_at: string
  }
}

export const ContentNote = ({ currentNote }: ContentNoteProps) => {
  return (
    <article className={styles.container}>
      <h1>{ currentNote.title }</h1>
      <div
        className={styles.contentBody}
        dangerouslySetInnerHTML={{ __html: currentNote.body }}
      />
      <time>{currentNote.created_at}</time>
    </article>
  )
}
