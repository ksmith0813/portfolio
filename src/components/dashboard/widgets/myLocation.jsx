import React from 'react'
import { Card, Col } from 'antd'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'

export const MyLocation = () => (
  <Col span={6}>
    <Card title='My Location - Fayetteville, AR'>
      <div className='card-display'>
        <MapComponent
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyAkObSsqX-hSZDMbztzQ-QI8Y--YDZywDo&v=3.exp&libraries=geometry,drawing,places'
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </Card>
  </Col>
)

const Map = () => (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 36.06258, lng: -94.15743 }}>
    <Marker
      position={{
        lat: 36.06258,
        lng: -94.15743,
      }}
    />
  </GoogleMap>
)

const MapComponent = withScriptjs(withGoogleMap(Map))
