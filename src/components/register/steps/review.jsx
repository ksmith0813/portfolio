import React from 'react'
import { useRegisterContext } from '../context/registerContext'

export const Review = () => {
  const { contact, movie, music, travel } = useRegisterContext()
  return <div>Review Content goes here</div>
}
