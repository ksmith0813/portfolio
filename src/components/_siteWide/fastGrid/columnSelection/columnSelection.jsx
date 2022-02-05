import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc'
import { Row, Col, Switch, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { updateDefaultColumns } from 'store/slices/gridSlice'
import { arrayMove, spacesToProperty } from 'utils/general'
import './columnSelection.scss'

const store = window.localStorage

export const ColumnSelection = ({ state, storeKey, defaultColumns, setShowingSelection }) => {
  const getColumnList = () => {
    let columnList = []
    Object.keys(state.OriginalData[0]).map((p, i) => {
      if (state.IgnoreColumns.includes(p)) return p
      columnList.push({
        id: i,
        property: p,
        show: state.VisibleColumns.includes(p),
      })
      return p
    })

    return columnList
  }

  const columnList = getColumnList()

  const [items, setItems] = useState(columnList.sort((a, b) => b.show - a.show))
  const dispatch = useDispatch()

  const resetIds = (options) => {
    let counter = 0
    options.map((o) => {
      return (o.id = counter++)
    })

    return options
  }

  useEffect(() => {
    let orderedColumns = []
    const storedColumnList = JSON.parse(store.getItem(storeKey))

    if (storedColumnList) {
      storedColumnList.map((s) => {
        const match = columnList.filter((c) => c.property === s)[0]
        if (match) orderedColumns.push({ ...match, show: true })
        return s
      })

      if (orderedColumns.length < columnList.length) {
        columnList.map((c) => {
          const match = orderedColumns.filter((f) => f.property === c.property)[0]
          if (!match) orderedColumns.push(c)
          return c
        })
      }
    } else {
      orderedColumns = columnList
    }

    setItems(resetIds(orderedColumns.sort((a, b) => b.show - a.show)))
    // eslint-disable-next-line
  }, [state.Key])

  const onChange = (property, show) => {
    let copy = [...items]
    const match = copy.filter((c) => c.property === property)[0]
    if (match) match.show = !show
    setItems(copy)
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
    dispatch(updateDefaultColumns(defaultColumns))
    store.removeItem(storeKey)
    setShowingSelection(false)
  }

  const apply = () => {
    let values = []
    items.map((c) => {
      return c.show && values.push(c.property)
    })

    dispatch(updateDefaultColumns(values))
    setShowingSelection(false)
  }

  const DragHandle = SortableHandle(() => <MenuOutlined className='column-menu-grab' />)

  const SortableItem = SortableElement(({ property, show }) => {
    let display = property
    return (
      <Row className='column-select-row'>
        <Col span={3}>
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
        <Row className='bold pb-100 border-bottom-light'>
          <Col span={3}>Order</Col>
          <Col flex={1} className='pl-100'>
            Column
          </Col>
          <Col className='pr-100'>Show</Col>
        </Row>
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
