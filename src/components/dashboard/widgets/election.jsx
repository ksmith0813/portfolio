import React, { useState, useEffect } from 'react'
import USAMap from 'react-usa-map'
import { findWhere } from 'underscore'
import { Col, Card } from 'antd'
import { states } from 'constants/states'
import { democrats, randomPositives, republicans } from 'constants/election'

export const Election = () => {
  const [message, setMessage] = useState({})

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage('')
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [message])

  const getConfig = () => {
    const config = {}
    democrats.map((state) => {
      config[state] = {}
      config[state].fill = '#9abeee'
      config[state].clickHandler = () => {
        const display = findWhere(states, { code: state })?.value
        const random = randomPositives[Math.floor(Math.random() * randomPositives.length)]
        setMessage({ display: `${display} - Biden was ${random}` })
      }
      return state
    })
    republicans.map((state) => {
      config[state] = {}
      config[state].fill = '#ff7373'
      config[state].clickHandler = () => {
        const display = findWhere(states, { code: state })?.value
        const random = randomPositives[Math.floor(Math.random() * randomPositives.length)]
        setMessage({ display: `${display} - Trump was ${random}` })
      }
      return state
    })

    return config
  }

  return (
    <Col span={6} className='pl-200'>
      <Card
        title='2020 Election'
        extra={
          <>
            <span className='fs-100 pr-050'>{message.icon}</span>
            {message.display}
          </>
        }
      >
        <div className='card-display usa'>
          <USAMap customize={getConfig()} />
        </div>
      </Card>
    </Col>
  )
}
