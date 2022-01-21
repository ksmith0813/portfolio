import React, { useState, useEffect } from 'react'
import { Row, Col, Switch, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { arrayMove, spacesToProperty } from 'utils/general'
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc'
import './columnSelection.scss'

const store = window.localStorage

export const ColumnSelection = ({
  state,
  setState,
  defaultColumns,
  storageColumns,
  columnList,
  setShowingSelection,
  storeKey,
}) => {
  const [items, setItems] = useState([])

  const resetIds = (options) => {
    let counter = 0
    options.map((o) => {
      return (o.id = counter++)
    })

    return options
  }

  useEffect(() => {
    let orderedColumns = []

    if (storageColumns) {
      storageColumns.map((s) => {
        const match = columnList.filter((c) => c.property === s)[0]
        if (match) orderedColumns.push({ ...match, show: true })
        return s
      })
    } else {
      orderedColumns = columnList
    }

    setItems(resetIds(orderedColumns))
    // eslint-disable-next-line
  }, [])

  if (!columnList.length || !items.length) return null

  const onChange = (property, show) => {
    let copy = [...items]
    const match = copy.filter((c) => c.property === property)[0]
    if (match) match.show = !show
    setItems(copy)
  }

  const setDefaultColumns = (columns) => {
    let copy = { ...state }
    copy.VisibleColumns = columns
    setState(copy)
    setShowingSelection(false)
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newOrder = arrayMove(items, oldIndex, newIndex)
    newOrder = resetIds(newOrder)
    setItems(newOrder)
  }

  const resetItems = () => {
    let values = []
    items.map((c) => {
      c.show = defaultColumns.includes(c.property)
      values.push(c)
      return c
    })

    resetIds(columnList)
    setItems(columnList)
    setDefaultColumns(defaultColumns)
    store.removeItem(storeKey)
  }

  const apply = () => {
    let values = []
    items.map((c) => {
      return c.show && values.push(c.property)
    })

    setDefaultColumns(values)
  }

  const DragHandle = SortableHandle(() => <MenuOutlined className='column-menu-grab' />)

  const SortableItem = SortableElement(({ property, show }) => {
    let display = property
    return (
      <Row className='column-select-row'>
        <Col>
          <DragHandle />
        </Col>
        <Col flex={1} className='pl-100'>
          {spacesToProperty(display)}
        </Col>
        <Col className='pl-100'>
          <Switch
            checkedChildren='Yes'
            unCheckedChildren='No'
            checked={show}
            onChange={() => onChange(property, show)}
          />
        </Col>
      </Row>
    )
  })

  const SortableListContainer = SortableContainer(() => (
    <>
      <div className='border-bottom-light pb-100'>
        {items.map(({ id, property, show }) => (
          <SortableItem key={id} index={id} property={property} show={show} />
        ))}
      </div>
      <Row className='pt-200'>
        <Col flex={1}>
          <Button onClick={resetItems}>Reset</Button>
        </Col>
        <Col>
          <Button onClick={apply} type='primary'>
            Apply
          </Button>
        </Col>
      </Row>
    </>
  ))

  return <SortableListContainer onSortEnd={onSortEnd} useDragHandle={true} lockAxis='y' />
}
