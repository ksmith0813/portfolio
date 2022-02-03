import React from 'react'
import { Card, Col } from 'antd'
import { withGoogleMap, withScriptjs } from 'react-google-maps'
import { MapLocation } from 'components/_siteWide/layout/layout'
import { GoogleMap } from 'constants/googleMap'

export const MyLocation = () => (
  <Col span={6}>
    <Card className='box-shadow' title={<span className='fs-125'>My Location - Fayetteville, AR</span>}>
      <div className='card-display'>
        <MapComponent
          googleMapURL={GoogleMap.url}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </Card>
  </Col>
)

const Map = () => <MapLocation lat={36.06} lon={-94.16} />

const MapComponent = withScriptjs(withGoogleMap(Map))
