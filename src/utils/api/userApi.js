import { get } from 'utils/api/api'

const url = 'https://randomuser.me/'

export const getUsers = (params) => get(url, `api?${params}`, 'user')
