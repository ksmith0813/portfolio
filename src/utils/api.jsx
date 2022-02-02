import axios from 'axios'
import { showMessage } from 'utils/general'

const post = (endpoint, api, data) => {
  const config = getUrl(api)
  return axios.post(`${config.url}${endpoint}`, data, { headers: config.headers })
}

const get = (endpoint, api, params = {}) => {
  const config = getUrl(api)
  return axios.get(`${config.url}${endpoint}`, { headers: config.headers, params: params })
}

const getUrl = (api) => {
  const config = { url: '', headers: {} }
  switch (api) {
    case 'product':
      config.url = 'https://fakestoreapi.com/'
      break
    case 'user':
      config.url = 'https://randomuser.me/'
      break
    case 'beer':
      config.url = 'https://api.openbrewerydb.org/'
      break
    case 'movie':
      config.url = 'https://www.omdbapi.com/'
      break
    default:
      config.url = 'https://jsonplaceholder.typicode.com/'
      break
  }

  return config
}

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const original = error?.config
    if (error?.response?.status === 500) {
      showMessage('Something unexpected happened. Please try again later.')
    } else if (error?.response?.status === 422) {
      showMessage('Unable to process your request at this time.')
    } else if (error?.response?.status === 401) {
      if (original && !original.retry) {
        original.retry = true
        return axios(original)
      } else {
        showMessage('You are not authorized to make this request at this time.')
      }
    }

    return Promise.reject(error)
  }
)

const movieApiKey = '5263fce'

const q = {
  // Product API
  getProductCategories: () => get('products/categories', 'product'),
  getAllProducts: () => get(`products`, 'product'),
  getProductsByCategory: (category) => get(`products/category/${category}`, 'product'),
  saveProduct: (product) => post('products/save', 'product', product),

  // Random User API
  getUsers: (params) => get(`api?${params}`, 'user'),

  // Todos API
  getTodos: () => get('todos', ''),

  // Breweries API
  getBreweries: () => get('breweries?per_page=100', 'beer'),

  // IMDB API:
  getMovies: (search) => get('', 'movie', { s: search, apiKey: movieApiKey }),
  getMovie: (id) => get('', 'movie', { i: id, apiKey: movieApiKey }),
}

export default q
