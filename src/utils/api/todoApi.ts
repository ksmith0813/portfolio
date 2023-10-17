import { get } from 'utils/api/api'

const url = 'https://jsonplaceholder.typicode.com/'

export const getTodos = () => get(url, 'todos', '')
