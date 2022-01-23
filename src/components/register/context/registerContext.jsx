import React, { useState, useContext, createContext } from 'react'
import { showMessage } from 'utils/general'

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

  const nextStep = (form) => {
    if (!handleFormUpdate(form)) {
      showMessage('Please fix all form errors.')
      return
    }

    setStep(step + 1)
  }

  const previousStep = () => setStep(step - 1)

  const handleFormUpdate = (form) => {
    let isValid = true
    switch (step) {
      case 1:
        isValid = handleMoveUpdate(form)
        break
      case 2:
        isValid = handleMusicUpdate(form)
        break
      case 3:
        isValid = handleTravelUpdate(form)
        break
      default:
        isValid = handleContactUpdate(form)
        break
    }

    return isValid
  }

  const handleMoveUpdate = (form) => {
    let copy = { ...movie }
    copy.FavoriteMovie = form.FavoriteMovie
    copy.FavoriteGenre = form.FavoriteGenre
    // TODO - valid
    setMovie(copy)
    return true
  }

  const handleMusicUpdate = (form) => {
    let copy = { ...music }
    copy.FavoriteBand = form.FavoriteBand
    copy.FavoriteSong = form.FavoriteSong
    copy.Instruments = form.Instruments
    copy.SoundCloud = form.SoundCloud
    // TODO - valid
    return true
  }

  const handleTravelUpdate = (form) => {
    let copy = { ...travel }
    copy.FavoriteCountry = form.FavoriteCountry
    copy.FavoriteCity = form.FavoriteCity
    copy.PlacesVisited = form.PlacesVisited
    // TODO - valid
    setMovie(copy)
    return true
  }

  const handleContactUpdate = (form) => {
    let copy = { ...contact }
    copy.FirstName = form.FirstName
    copy.LastName = form.LastName
    copy.Address = form.Address
    copy.Address2 = form.Address2
    copy.City = form.City
    copy.State = form.State
    copy.Zip = form.Zip
    copy.Email = form.Email
    copy.Phone = form.Phone
    // TODO - valid
    setMovie(copy)
    return true
  }

  const handleErrors = (formData, errors) => {
    // TODO
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
        handleErrors,
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
