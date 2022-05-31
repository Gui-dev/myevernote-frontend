import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { AxiosError } from 'axios'

import { api } from '../services/api'

export type NoteProps = {
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

type NoteContextProps = {
  notes: NoteProps[]
  loadNotes: () => Promise<void>
}

type NoteProviderProps = {
  children: ReactNode
}

export const NoteContext = createContext({} as NoteContextProps)

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState<NoteProps[]>([])

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    const { data } = await api.get('/notes')
    const dataFormatted = data.map((note: NoteProps) => {
      return {
        ...note,
        titleFormatted: note.title.substring(0, 15),
        bodyFormatted: note.body.substring(0, 40),
        dateFormatted: format(new Date(note.created_at), 'dd/MM/yyyy', { locale: ptBr })
      }
    })

    setNotes(dataFormatted.reverse())
  }

  return (
    <NoteContext.Provider value={{
      notes,
      loadNotes
    }}>
      { children }
    </NoteContext.Provider>
  )
}
