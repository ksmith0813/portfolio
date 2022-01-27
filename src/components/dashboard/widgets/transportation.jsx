import React from 'react'
import { Card, Col } from 'antd'
import { NivoLine } from 'components/_siteWide/charts/nivoLine'

export const Transportation = () => (
  <Col span={12} className='pt-200'>
    <Card title='Transportation Categories'>
      <div className='card-display'>
        <NivoLine margin={{ top: 50, right: 50, bottom: 50, left: 50 }} hideLegend />
      </div>
    </Card>
  </Col>
)
