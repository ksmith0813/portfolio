import { get } from 'utils/api/api'

const url = 'https://api.openbrewerydb.org/'

export const getBreweries = () => get(url, 'breweries?per_page=100', 'beer')
