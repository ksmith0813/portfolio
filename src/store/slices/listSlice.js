import { createSlice } from '@reduxjs/toolkit'
import { findWhere } from 'underscore'

export const slice = createSlice({
  name: 'list',
  initialState: {
    loading: true,
    todos: [],
    originalTodos: [],
    counter: 0,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    setOriginalTodos: (state, action) => {
      state.todos = action.payload
      state.originalTodos = action.payload
      state.counter = state.originalTodos.length
    },
    addTodo: (state) => {
      const newTodo = {
        id: ++state.counter,
        userId: null,
        title: '',
        completed: false,
      }
      state.todos.unshift(newTodo)
      state.originalTodos.unshift(newTodo)
    },
    removeTodo: (state, action) => {
      const remainingItems = [...state.todos].filter((item) => item.id !== action.payload.id)
      state.todos = remainingItems
      state.originalTodos = remainingItems
    },
    updateTodo: (state, action) => {
      const todo = action.payload
      const findMatch = (todos) => {
        const match = findWhere(todos, { id: todo.id })
        if (match) {
          match.completed = todo.completed
          match.title = todo.title
          match.userId = todo.userId
        }
      }

      findMatch([...state.todos])
      findMatch([...state.originalTodos])
    },
  },
})

export const { setLoading, setTodos, setOriginalTodos, addTodo, removeTodo, updateTodo } = slice.actions

export default slice.reducer
