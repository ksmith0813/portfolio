import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Row, Col, Select, Switch, Spin } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { userNames } from 'constants/users'
import {
  getState,
  setLoading,
  setOriginalTodos,
  setTodos,
  addTodo,
  removeTodo,
  updateTodo,
  submit,
} from 'store/slices/listSlice'
import api from 'utils/api'
import './list.scss'

const { Option } = Select

export const List = () => {
  const state = useSelector(getState)
  const loading = state.loading
  const todos = state.todos
  const originalTodos = state.originalTodos
  const dispatch = useDispatch()

  useEffect(() => {
    if (originalTodos.length) return
    api.getTodos().then(({ data }) => {
      dispatch(setTodos(data))
      dispatch(setOriginalTodos(data))
      dispatch(setLoading(false))
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className='page-center'>
      <Col span={13}>
        <Row justify='center' className='fs-150 text-center'>
          Things you need to do...
        </Row>
        <Row justify='center' className='m-200'>
          <Search todos={originalTodos} setTodos={setTodos} setLoading={setLoading} />
        </Row>
        <div className='todo-list-container'>
          {loading && (
            <div className='content-center'>
              <Spin />
            </div>
          )}
          {!loading && !todos.length && (
            <div className='fs-150 content-center'>
              <div>Sorry, no results found my friend.</div>
            </div>
          )}
          {!loading && todos.length > 0 && (
            <>
              <TodoHeader />
              <div className='todo-list-items'>
                {todos.map((t, i) => (
                  <TodoRow key={t.id} index={i} todo={t} />
                ))}
              </div>
            </>
          )}
        </div>
        <Row justify='center'>
          <Button type='primary' size='large' disabled={loading} onClick={() => dispatch(submit())}>
            Submit
          </Button>
        </Row>
      </Col>
    </div>
  )
}

const Search = ({ todos, setTodos }) => {
  const [search, setSearch] = useState('')
  const [searchChanged, setSearchChanged] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchChanged) {
        if (search) {
          const matches = todos.filter(
            (c) => c.userId && c.title.toLowerCase().trim().includes(search.toLowerCase().trim())
          )
          dispatch(setTodos(matches))
        } else {
          dispatch(setTodos(todos))
        }
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line
  }, [search, searchChanged])

  const onSearchChange = (e) => {
    setSearchChanged(true)
    setSearch(e.target.value || '')
  }

  return (
    <Col span={10}>
      <Input onChange={onSearchChange} value={search} placeholder='Search for things to do' allowClear />
    </Col>
  )
}

const TodoHeader = () => (
  <Row className='bold border-bottom-light pb-100'>
    <Col span={1}>Action</Col>
    <Col span={5} className='pl-150'>
      User
    </Col>
    <Col span={15} className='pl-100'>
      Description
    </Col>
    <Col span={3} className='pl-050'>
      Completed
    </Col>
  </Row>
)

const TodoRow = ({ index, todo }) => {
  const [currentTodo, setCurrentTodo] = useState()
  const [title, setTitle] = useState()
  const [titleChanged, setTitleChanged] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrentTodo(todo)
    setTitle(todo.title)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleChanged) {
        if (title) {
          let copyCurrent = { ...currentTodo }
          copyCurrent.title = title
          setCurrentTodo(copyCurrent)
          dispatch(updateTodo({ ...copyCurrent, title: title, userId: todo.userId }))
        } else {
          dispatch(updateTodo({ ...currentTodo, title: '', userId: todo.userId }))
        }
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line
  }, [title])

  const onTitleChange = (e) => {
    setTitleChanged(true)
    setTitle(e.target.value || '')
  }

  return (
    <Row className='pt-200'>
      <Col span={1} className='fs-150'>
        {index === 0 && <PlusCircleOutlined onClick={() => dispatch(addTodo())} className='clickable add-item' />}
        {index > 0 && (
          <MinusCircleOutlined
            onClick={() => dispatch(removeTodo({ id: todo.id }))}
            className='clickable remove-item'
          />
        )}
      </Col>
      <Col span={5} className='pl-150'>
        <Select
          value={userNames.filter((n) => n.id === todo.userId)[0]?.value}
          className='user-select'
          onChange={(value) => dispatch(updateTodo({ ...todo, userId: value }))}
        >
          {userNames.map((u, i) => (
            <Option key={i} value={u.id}>
              {u.value}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={15} className='pl-150'>
        <Input value={title} onChange={onTitleChange} />
      </Col>
      <Col span={3} className='pl-150 pt-025'>
        <Switch
          checked={todo.completed}
          checkedChildren='Yes'
          unCheckedChildren='No'
          onClick={() => dispatch(updateTodo({ ...todo, completed: !todo.completed }))}
        />
      </Col>
    </Row>
  )
}
