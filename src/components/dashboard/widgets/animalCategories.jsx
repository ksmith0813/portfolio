import React from 'react'
import { Card, Col } from 'antd'
import { NivoPie } from 'components/_siteWide/charts/nivoPie'

export const AnimalCategories = () => (
  <Col span={6} className='pt-200 pl-200'>
    <Card title='Animal Categories'>
      <div className='card-display'>
        <NivoPie margin={{ top: 50, right: 50, bottom: 50, left: 50 }} hideLegend />
      </div>
    </Card>
  </Col>
)
