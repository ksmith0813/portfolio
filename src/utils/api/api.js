import axios from 'axios'
import { showMessage } from 'utils/general'

export const get = (url, endpoint, params = {}) => {
  return axios.get(`${url}${endpoint}`, { params: params })
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
