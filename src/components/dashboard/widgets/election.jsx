import React from 'react'
import USAMap from 'react-usa-map'
import { Col, Card } from 'antd'
import { showMessage } from 'utils/general'

export const Election = () => {
  const getConfig = () => {
    const config = {}

    democrats.map((state) => {
      config[state] = {}
      config[state].fill = '#76abf3'
      config[state].clickHandler = () => showMessage(`${state} liked Biden better.`, 'info')
      return state
    })
    republicans.map((state) => {
      config[state] = {}
      config[state].fill = '#f22939'
      config[state].clickHandler = () => showMessage(`${state} liked Trump better.`, 'error')
      return state
    })

    return config
  }

  return (
    <Col span={6} className='pt-200 pl-200'>
      <Card title='2020 Election'>
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
