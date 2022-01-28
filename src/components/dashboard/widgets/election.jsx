import React, { useState } from 'react'
import USAMap from 'react-usa-map'
import { Col, Card } from 'antd'
import { states } from 'constants/states'

const randomPositives = ['better', 'greater', 'superior', 'exceeding', 'more desireable', 'prominent']

export const Election = () => {
  const [message, setMessage] = useState({})
  const getConfig = () => {
    const config = {}

    democrats.map((state) => {
      config[state] = {}
      config[state].fill = '#76abf3'
      config[state].clickHandler = () => {
        const display = states.filter((s) => s.code === state)[0].value
        const random = randomPositives[Math.floor(Math.random() * randomPositives.length)]
        setMessage({ display: `${display} - Biden was ${random}` })
      }
      return state
    })
    republicans.map((state) => {
      config[state] = {}
      config[state].fill = '#f22939'
      config[state].clickHandler = () => {
        const display = states.filter((s) => s.code === state)[0].value
        const random = randomPositives[Math.floor(Math.random() * randomPositives.length)]
        setMessage({ display: `${display} - Trump was ${random}` })
      }
      return state
    })

    return config
  }

  return (
    <Col span={6} className='pt-200 pl-200'>
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

const democrats = [
  'AZ',
  'NY',
  'CT',
  'MD',
  'WA',
  'OR',
  'NV',
  'NM',
  'DC',
  'DE',
  'MA',
  'MN',
  'WI',
  'IL',
  'VT',
  'RI',
  'NJ',
  'CO',
  'CA',
  'PA',
  'VA',
  'GA',
  'ME',
  'NH',
  'HI',
]
const republicans = [
  'ID',
  'MT',
  'IN',
  'TE',
  'AK',
  'KY',
  'NC',
  'WV',
  'WY',
  'ND',
  'SD',
  'NE',
  'UT',
  'TN',
  'KS',
  'OK',
  'TX',
  'IO',
  'MO',
  'AR',
  'AL',
  'MS',
  'LA',
  'MI',
  'LA',
  'FL',
  'SC',
  'OH',
  'IA',
]
