import { useContext } from 'react'

import { NoteContext } from './../contexts/note'

export const useNote = () => {
  const context = useContext(NoteContext)

  return context
}
