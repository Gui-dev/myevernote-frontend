import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

import styles from './style.module.scss'

type RichTextProps = {
  note: string
  setBody: React.Dispatch<React.SetStateAction<string>>
}

export const RichText = ({ note, setBody }: RichTextProps) => {
  const [value, setValue] = useState('')
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code', 'size'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  useEffect(() => {
    setValue(note)
  }, [note])

  useEffect(() => {
    setBody(value)
  }, [value, setBody])

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      style={{ border: 0 }}
      className={styles.richText}
    />
  )
}
