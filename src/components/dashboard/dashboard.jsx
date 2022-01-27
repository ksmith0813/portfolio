import { Result } from 'antd'
import React from 'react'
import './dashboard.scss'

export const Dashboard = () => {
  return (
    <div className='page-center fs-300'>
      <Result
        status='404'
        title='Under Construction'
        subTitle='Sorry, the page you visited is currently being built.'
      />
    </div>
  )
}
