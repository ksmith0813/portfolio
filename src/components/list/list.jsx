import React, { useEffect, useState } from 'react'
import { Button, Input, Row, Col, Select, Switch, Spin } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import api from 'utils/api'
import { arrayRemove, showMessage } from 'utils/general'
import './list.scss'
import { userNames } from 'constants/users'

const { Option } = Select

export const List = () => {
  const [loading, setLoading] = useState(false)
  const [originalTodos, setOriginalTodos] = useState()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    setLoading(true)
    api.getTodos().then(({ data }) => {
      setTodos(data)
      setOriginalTodos(data)
      setLoading(false)
    })
  }, [])

  const addTodo = () => {
    let copy = [...todos]
    copy.unshift({
      id: todos.length + 1,
      userId: null,
      title: '',
      completed: false,
      isNew: true,
    })

    setTodos(copy)
  }

  const removeTodo = (id) => {
    let copy = [...todos]
    arrayRemove(copy, 'id', id)
    setTodos(copy)
  }

  const updateTodo = (todo) => {
    let copy = [...todos]
    const match = copy.filter((t) => t.id === todo.id)[0]

    if (match) {
      match.completed = todo.completed
      match.title = todo.title
      match.userId = todo.userId
      setTodos(copy)
    }
  }

  const submit = () => showMessage('Successfully updated your todo list!', 'success')

  return (
    <div className='page-center'>
      <Col span={12}>
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
          {!loading && !todos.length && <div className='fs-150 content-center'>Sorry, no results found my friend</div>}
          {!loading && todos.length > 0 && (
            <>
              <Row className='bold border-bottom-light pb-100'>
                <Col span={1}>
                  Action
                </Col>
                <Col span={5} className='pl-150'>
                  User
                </Col>
                <Col span={15} className='pl-100'>
                  Title
                </Col>
                <Col span={3} className='pl-050'>
                  Completed
                </Col>
              </Row>
              <div className='todo-list-items'>
                {todos.map((t, i) => (
                  <Row key={t.id} className='pt-200'>
                    <Col span={1} className='fs-150'>
                      {i === 0 && <PlusCircleOutlined onClick={() => addTodo()} className='clickable add-item' />}
                      {i > 0 && (
                        <MinusCircleOutlined onClick={() => removeTodo(t.id)} className='clickable remove-item' />
                      )}
                    </Col>
                    <Col span={5} className='pl-150'>
                      <Select
                        value={userNames.filter((n) => n.id === t.userId)[0]?.value}
                        className='user-select'
                        onChange={(value) => updateTodo({ ...t, userId: value })}
                      >
                        {userNames.map((u, i) => (
                          <Option key={i} value={u.id}>
                            {u.value}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={15} className='pl-150'>
                      <Input
                        value={t.title}
                        onChange={(e) => updateTodo({ ...t, title: e.target.value })}
                      />
                    </Col>
                    <Col span={3} className='pl-150 pt-025'>
                      <Switch
                        checked={t.completed}
                        checkedChildren='Yes'
                        unCheckedChildren='No'
                        onClick={() => updateTodo({ ...t, completed: !t.completed })}
                      />
                    </Col>
                  </Row>
                ))}
              </div>
            </>
          )}
        </div>
        <Row justify='center'>
          <Button type='primary' size='large' onClick={submit}>
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchChanged) {
        if (search) {
          const matches = todos.filter((c) => c.userId && c.title.toLowerCase().includes(search.toLowerCase()))
          setTodos(matches)
        } else {
          setTodos(todos)
        }
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [search, searchChanged, todos, setTodos])

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
