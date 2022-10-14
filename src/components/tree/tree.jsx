import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Input, Row, Tree as TreeView } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { NoData } from 'components/_siteWide/layout/layout'
import { treeData } from 'data/tree'
import { getState, setSearch } from 'store/slices/treeSlice'
import { useEffect } from 'react'
import { useCallback } from 'react'

export const Tree = () => {
  const [data, setData] = useState([...treeData])
  const state = useSelector(getState)
  const search = state.search
  const dispatch = useDispatch()

  const handleSearch = useCallback(
    (value) => {
      dispatch(setSearch(value))

      if (value) {
        const newValues = []
        for (const item of [...treeData]) {
          let newValue = null
          if (item.title.toLowerCase().includes(value.toLowerCase())) {
            newValue = { ...item }
            newValue.children = []
          }

          for (const child of [...item.children]) {
            if (child.title.toLowerCase().includes(value.toLowerCase())) {
              if (!newValue) newValue = { key: item.key, title: item.title, children: [] }
              newValue.children.push(child)
            }
          }

          if (newValue) newValues.push(newValue)
        }

        setData(newValues)
      } else {
        setData(treeData)
      }
    },
    [dispatch]
  )

  useEffect(() => {
    if (search) handleSearch(search)
  }, [search, handleSearch])

  const matchParamsForSearch = (title) => {
    const index = title.toLowerCase().indexOf(search.toLowerCase())
    const before = title.substring(0, index)
    const after = title.slice(index + search.length)
    const match = title.replace(before, '').replace(after, '')
    return { title, index, before, after, match }
  }

  const formatMatchForSearch = (index, title, before, after, match) => {
    return index > -1 ? (
      <span>
        {before}
        <b className='treeSearch'>{match}</b>
        {after}
      </span>
    ) : (
      <span>{title}</span>
    )
  }

  const buildMatchesForSearch = (item) => {
    const formattedItem = { key: item.key, children: [] }
    const { title, index, before, after, match } = matchParamsForSearch(item.title)
    formattedItem.title = formatMatchForSearch(index, title, before, after, match)

    for (const child of item.children) {
      const formattedChild = { key: child.key }
      const { title, index, before, after, match } = matchParamsForSearch(child.title)
      formattedChild.title = formatMatchForSearch(index, title, before, after, match)
      formattedItem.children.push(formattedChild)
    }

    return formattedItem
  }

  const tree = data.map((item, index) => {
    if (search) item = buildMatchesForSearch(item)
    return (
      <TreeView
        key={index}
        treeData={[item]}
        expandedKeys={[item.key]}
        switcherIcon={<DownOutlined />}
        className='p-100'
      />
    )
  })

  const noMatchesText = !data.length && <NoData />

  return (
    <div className='p-200 pt-300'>
      <Row justify='center'>
        <Col span={11}>
          <Row justify='center' className='fs-175 pb-200'>
            Searchable Tree
          </Row>
          <Row>
            <Col span={24}>
              <Input
                value={search}
                placeholder='Search'
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                size='large'
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className='mt-100'>
              {tree}
              {noMatchesText}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
