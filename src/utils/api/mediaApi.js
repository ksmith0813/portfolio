import { keys } from 'keys'
import { get } from 'utils/api/api'

const url = 'https://www.omdbapi.com/'

export const getMedias = (search) => get(url, '', { s: search, apiKey: keys.movieApi })

export const getMedia = (id) => get(url, '', { i: id, apiKey: keys.movieApi })
