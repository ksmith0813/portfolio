import React from 'react'
import { useSelector } from 'react-redux'
import { Row } from 'antd'
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps'
import { getState } from 'store/slices/themeSlice'
import { isArray } from 'utils/general'
import { keys } from 'keys'
import { LottieFile } from '../animation/lottieFile'
import loaderBlue from 'assets/default/loader-default.json'
import loaderGreen from 'assets/green/loader-green.json'
import loaderPurple from 'assets/purple/loader-purple.json'
import './layout.scss'

export const DataItem = ({ label, children, labelClasses = '', childrenClasses = '' }) => {
  if ((isArray(children) && !children.length) || !children) children = 'N/A'
  return (
    <>
      <Row className={labelClasses}>
        <b>{label}</b>
      </Row>
      <Row className={`light-text ${childrenClasses}`}>{children}</Row>
    </>
  )
}

export const Categories = ({ items, selected, onClick }) => {
  return items.map((c, i) => (
    <span className={`${selected === c && 'selected'} clickable`} key={i} onClick={() => onClick(c)}>
      {c}
    </span>
  ))
}

export const Loader = () => {
  const state = useSelector(getState)
  const theme = state.selectedTheme
  const loader = theme === 'default' ? loaderBlue : theme === 'green' ? loaderGreen : loaderPurple
  return (
    <div className='pt-500'>
      <LottieFile animationData={loader} autoplay={true} height={200} width={200} />
    </div>
  )
}

export const MapLocation = ({ location, containerClass }) => {
  const Map = () => <MapMarker lat={location.lat} lon={location.lon} />
  const MapComponent = withScriptjs(withGoogleMap(Map))

  return (
    <div className={containerClass}>
      <MapComponent
        googleMapURL={keys.mapUrl}
        loadingElement={<div style={{ height: '100%', width: '100%' }} />}
        containerElement={<div style={{ height: '100%', width: '100%' }} />}
        mapElement={<div style={{ height: '100%', width: '100%' }} />}
      />
    </div>
  )
}

const MapMarker = ({ lat, lon }) => (
  <GoogleMap defaultZoom={14} defaultCenter={{ lat: lat, lng: lon }}>
    <Marker
      position={{
        lat: lat,
        lng: lon,
      }}
    />
  </GoogleMap>
)

export const NoData = ({ message = 'No Data' }) => (
  <div className='content-center'>
    <svg width='184' height='152' viewBox='0 0 184 152' xmlns='http://www.w3.org/2000/svg'>
      <g fill='none' fill-rule='evenodd'>
        <g transform='translate(24 31.67)'>
          <ellipse class='ant-empty-img-default-ellipse' cx='67.797' cy='106.89' rx='67.797' ry='12.668'></ellipse>
          <path
            fill='#aeb8c2'
            d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
          ></path>
          <path
            d='M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z'
            transform='translate(13.56)'
          ></path>
          <path
            fill='white'
            d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
          ></path>
          <path
            fill='#dce0e6'
            d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
          ></path>
        </g>
      </g>
    </svg>
    <div className='no-data-message'>{message}</div>
  </div>
)
