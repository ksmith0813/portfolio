import { keys } from 'keys'
import { get } from 'utils/api/api'

const url = 'https://api.weatherapi.com/v1/'

export const getWeather = (search) => get(url, 'forecast.json', { q: search, key: keys.weatherApi })
