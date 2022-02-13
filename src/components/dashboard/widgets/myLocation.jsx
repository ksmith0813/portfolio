import React from 'react'
import { Card, Col } from 'antd'
import { MapLocation } from 'components/_siteWide/layout/layout'

export const MyLocation = () => (
  <Col span={6}>
    <Card title={<span className='fs-125'>My Location</span>}>
      <MapLocation location={{ lat: 36.08689883375299, lon: -94.21634189949994 }} containerClass='card-display' />
    </Card>
  </Col>
)
