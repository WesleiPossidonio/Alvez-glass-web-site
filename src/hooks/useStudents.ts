import { useContext } from 'react'

import { SchoolContext } from '@/contexts/AlunosContext'

export const useStudentsData = () => {
  const context = useContext(SchoolContext)
  return context
}