import React from 'react'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'

export const Review = () => {
  const { contact, movie, music, travel } = useRegisterContext()

  console.log('contact', contact)
  console.log('movie', movie)
  console.log('music', music)
  console.log('travel', travel)
  return (
    <div>
      <div className='steps-content'></div>
      <Actions />
    </div>
  )
}
