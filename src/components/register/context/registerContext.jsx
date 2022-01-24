import React, { useState, useContext, createContext } from 'react'
import { showMessage } from 'utils/general'
import { validateRequiredFields } from 'components/_siteWide/form/util'
import { validateProperty } from 'components/_siteWide/form/validators/_baseValidator'
import { validateZip } from 'components/_siteWide/form/validators/validateZip'
import { validatePhone } from 'components/_siteWide/form/validators/validatePhone'
import { validateEmail } from 'components/_siteWide/form/validators/validateEmail'

const RegisterContext = createContext(null)

export const RegisterContextProvider = ({ children }) => {
  const [step, setStep] = useState(0)
  const [contact, setContact] = useState({
    FirstName: '',
    LastName: '',
    Address: '',
    Address2: '',
    City: '',
    State: '',
    Zip: '',
    Email: '',
    Phone: '',
    errors: [],
  })
  const [movie, setMovie] = useState({
    FavoriteMovie: '',
    FavoriteGenres: [],
    errors: [],
  })
  const [music, setMusic] = useState({
    FavoriteBand: '',
    FavoriteSong: '',
    Instruments: [],
    SoundCloud: '',
    errors: [],
  })
  const [travel, setTravel] = useState({
    FavoriteCountry: '',
    FavoriteCity: '',
    PlacesVisited: [],
    errors: [],
  })

  const searchMovies = (search) => {
    // TODO - hit IMDB EP
  }

  const nextStep = () => {
    if (!handleFormUpdate()) {
      showMessage('Please fix all form errors.')
      return
    }

    setStep(step + 1)
  }

  const previousStep = () => setStep(step - 1)

  const handleFormUpdate = () => {
    let isValid = true
    switch (step) {
      case 1:
        isValid = handleMovieUpdate()
        break
      case 2:
        isValid = handleMusicUpdate()
        break
      case 3:
        isValid = handleTravelUpdate()
        break
      default:
        isValid = handleContactUpdate()
        break
    }

    return isValid
  }

  const handleMovieUpdate = () => {
    let copy = { ...movie }
    copy.errors = []
    copy = validateRequiredFields(copy)
    setMovie(copy)
    return !copy.errors.length
  }

  const handleMusicUpdate = () => {
    let copy = { ...music }
    copy.errors = []
    copy = validateRequiredFields(copy, ['Instruments', 'SoundCloud'])
    setMusic(copy)
    return !copy.errors.length
  }

  const handleTravelUpdate = () => {
    let copy = { ...travel }
    copy.errors = []
    copy = validateRequiredFields(copy, ['PlacesVisited'])
    setTravel(copy)
    return !copy.errors.length
  }

  const handleContactUpdate = () => {
    let copy = { ...contact }
    copy.errors = []
    copy = validateRequiredFields(copy, ['Address2'])
    validateProperty(validateZip, copy, 'Zip', null, true)
    validateProperty(validatePhone, copy, 'Phone', null, true)
    validateProperty(validateEmail, copy, 'Email', null, true)
    setContact(copy)
    return !copy.errors.length
  }

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
