import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

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
  loading: boolean
  loadNotes: () => Promise<void>
  createNote: (title: string, body: string) => Promise<void>
  findNoteById: (id: string) => Promise<NoteProps | undefined>
  updateNote: (id: string, title: string, body: string) => Promise<void>
  deleteNote: (id: string) => Promise<void>
}

type NoteProviderProps = {
  children: ReactNode
}

export const NoteContext = createContext({} as NoteContextProps)

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    try {
      setLoading(true)
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
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const createNote = async (title: string, body: string) => {
    try {
      setLoading(true)
      if (title === '' || body === '') {
        toast.warning('Todos os campos devem ser preenchidos')
        return
      }
      await api.post('/notes', {
        title,
        body
      })
      await loadNotes()
      toast.success('Nota criada com sucesso')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const findNoteById = async (id: string) => {
    try {
      setLoading(true)
      const { data } = await api.get(`/notes/${id}`)
      return data as NoteProps
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateNote = async (id: string, title: string, body: string) => {
    try {
      setLoading(true)
      if (title === '' || body === '') {
        toast.warning('Todos os campos devem ser preenchidos')
        return
      }
      await api.put(`/notes/${id}`, {
        title,
        body
      })
      await loadNotes()
      toast.success('Nota atualizada com sucesso')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (id: string) => {
    try {
      setLoading(true)
      await api.delete(`/notes/${id}`)
      await loadNotes()
      toast.success('Nota deletada com sucesso')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <NoteContext.Provider value={{
      notes,
      loading,
      loadNotes,
      createNote,
      findNoteById,
      updateNote,
      deleteNote
    }}>
      { children }
    </NoteContext.Provider>
  )
}
