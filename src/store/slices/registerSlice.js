import { createSlice } from '@reduxjs/toolkit'
import { validateRequiredFields } from 'components/_siteWide/form/util'
import { validateEmail } from 'components/_siteWide/form/validators/validateEmail'
import { validatePhone } from 'components/_siteWide/form/validators/validatePhone'
import { validateZip } from 'components/_siteWide/form/validators/validateZip'
import { validateProperty } from 'components/_siteWide/form/validators/_baseValidator'
import { showMessage } from 'utils/general'

const defaultContact = {
  FirstName: '',
  LastName: '',
  Address: '',
  Apt: '',
  City: '',
  State: '',
  Zip: '',
  Email: '',
  Phone: '',
  errors: [],
}
const defaultMovie = {
  FavoriteMovie: '',
  FavoriteGenres: [],
  errors: [],
}
const defaultMusic = {
  FavoriteBand: '',
  FavoriteSong: '',
  Instruments: [],
  SoundCloud: '',
  errors: [],
}
const defaultTravel = {
  FavoriteCountries: [],
  FavoriteCity: '',
  PlacesVisited: [],
  errors: [],
}

export const slice = createSlice({
  name: 'register',
  initialState: {
    step: 0,
    changed: false,
    contact: defaultContact,
    movie: defaultMovie,
    music: defaultMusic,
    travel: defaultTravel,
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload
    },
    setMovie: (state, action) => {
      state.movie = action.payload
    },
    setMusic: (state, action) => {
      state.music = action.payload
    },
    setTravel: (state, action) => {
      state.travel = action.payload
    },
    reset: (state) => {
      switch (state.step) {
        case 1:
          state.movie = defaultMovie
          break
        case 2:
          state.music = defaultMusic
          break
        case 3:
          state.travel = defaultTravel
          break
        default:
          state.contact = defaultContact
          break
      }
    },
    previousStep: (state) => {
      state.step = state.step - 1
    },
    nextStep: (state, action) => {
      if (!handleFormUpdate(state, action.payload)) {
        showMessage('Please fix all form errors.')
        return
      }

      state.step = state.step + 1
      state.changed = false
    },
    complete: () => showMessage('Your information has been successfully submitted!', 'success'),
  },
})

export const { setContact, setMovie, setMusic, setTravel, reset, previousStep, nextStep, complete } = slice.actions

export const getState = (state) => state.register

export default slice.reducer

const handleFormUpdate = (state, payload) => {
  let isValid = true
  switch (state.step) {
    case 1:
      isValid = handleMovieUpdate(payload)
      break
    case 2:
      isValid = handleMusicUpdate(payload)
      break
    case 3:
      isValid = handleTravelUpdate(payload)
      break
    default:
      isValid = handleContactUpdate(payload)
      break
  }

  return isValid
}

const handleContactUpdate = (payload) => {
  let copy = { ...payload }
  copy.errors = []
  validateRequiredFields(copy, ['step', 'Apt'])
  validateProperty(validateZip, copy, 'Zip', null, true)
  validateProperty(validatePhone, copy, 'Phone', null, true)
  validateProperty(validateEmail, copy, 'Email', null, true)
  return !copy.errors.length
}

const handleMovieUpdate = (payload) => {
  let copy = { ...payload }
  copy.errors = []
  validateRequiredFields(copy)
  return !copy.errors.length
}

const handleMusicUpdate = (payload) => {
  let copy = { ...payload }
  copy.errors = []
  validateRequiredFields(copy, ['step', 'Instruments', 'SoundCloud'])
  return !copy.errors.length
}

const handleTravelUpdate = (payload) => {
  let copy = { ...payload }
  copy.errors = []
  validateRequiredFields(copy, ['step', 'PlacesVisited'])
  return !copy.errors.length
}
