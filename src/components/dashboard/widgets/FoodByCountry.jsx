import React from 'react'
import { Card, Col } from 'antd'
import { NivoBar } from 'components/_siteWide/charts/nivoBar'

export const FoodByCountry = () => (
  <Col span={12} className='pt-200'>
    <Card title={<span className='fs-125'>Food By Country</span>}>
      <div className='card-display'>
        <NivoBar margin={{ top: 80, right: 80, bottom: 80, left: 80 }} translateY={-60} />
      </div>
    </Card>
  </Col>
)
