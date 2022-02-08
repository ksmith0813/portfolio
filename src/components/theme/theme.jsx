import React from 'react'
import { Button, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getState, setSelectedTheme } from 'store/slices/themeSlice'
import './theme.scss'

export const Theme = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()
  return (
    <div className='page-center flex-column'>
      <Row className='fs-200'>Please select a theme below</Row>
      <Row className='pt-300'>
        <Button
          className={`theme-button blue ${state.selectedTheme === 'default' ? 'selected' : ''}`}
          onClick={() => dispatch(setSelectedTheme('default'))}
        >
          Blue
        </Button>
      </Row>
      <Row className='pt-300'>
        <Button
          className={`theme-button green ${state.selectedTheme === 'green' ? 'selected' : ''}`}
          onClick={() => dispatch(setSelectedTheme('green'))}
        >
          Green
        </Button>
      </Row>
    </div>
  )
}
