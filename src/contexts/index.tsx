import React from 'react'

import { AuthProvider } from './auth'
import { NoteProvider } from './note'

type ContextsProps = {
  children: React.ReactNode
}

export const Contexts = ({ children }: ContextsProps) => {
  return (
    <AuthProvider>
      <NoteProvider>
        {children}
      </NoteProvider>
    </AuthProvider>
  )
}
