import React, { useState, useContext, createContext } from 'react'
import api from 'utils/api'
import { showMessage } from 'utils/general'

const RegisterContext = createContext(null)

export const RegisterContextProvider = ({ children }) => {
  const [step, setStep] = useState(0)
  const [contact, setContact] = useState({
    LastName: '',
    FirstName: '',
    Address: '',
    Address2: '',
    City: '',
    State: '',
    Zip: '',
    Email: '',
    Phone: '',
  })
  const [movie, setMovie] = useState({
    FavoriteMovie: '',
    FavoriteGenre: '',
  })
  const [music, setMusic] = useState({
    FavoriteBand: '',
    FavoriteSong: '',
    Instruments: [],
    SoundCloud: '',
  })
  const [travel, setTravel] = useState({
    FavoriteCountry: '',
    FavoriteCity: '',
    PlacesVisited: [],
  })

  const searchMovies = (search) => {
    // hit imdb EP
  }

  const validateForm = () => {
    let isValid = true
    switch (step) {
      case 1:
        isValid = validateMovie()
        break
      case 2:
        isValid = validateMusic()
        break
      case 3:
        isValid = validateTravel()
        break
      default:
        isValid = validateContact()
        break
    }

    return isValid
  }

  const validateMovie = () => {
    return true
  }

  const validateMusic = () => {
    return true
  }

  const validateTravel = () => {
    return true
  }

  const validateContact = () => {
    return true
  }

  const nextStep = () => {
    if (!validateForm()) {
      showMessage('Please fix all form errors.')
      return
    }

    setStep(step + 1)
  }

  const previousStep = () => setStep(step - 1)

  const complete = () => showMessage('Your information has been successfully submitted!', 'success')

  return (
    <RegisterContext.Provider
      value={{
        // state
        step,
        contact,
        setContact,
        movie,
        setMovie,
        music,
        setMusic,
        travel,
        setTravel,

        // functions
        searchMovies,
        nextStep,
        previousStep,
        complete,
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export const useRegisterContext = () => {
  const context = useContext(RegisterContext)
  if (!context) throw new Error('Context must used within a provider')
  return context
}
