import React from 'react'
import { useGridContext } from '../context/gridContext'

export const User = () => {
  const { user } = useGridContext()

  return <div className='page'>{user.Name}</div>
}
