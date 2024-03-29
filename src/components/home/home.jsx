import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import { LottieFile } from 'components/_siteWide/animation/lottieFile'
import { data } from './data'
import './home.scss'

export const Home = () => {
  const navigate = useNavigate()
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)

  const Tile = ({ page, title }) => {
    const lottie = data(page)
    const containerClass = page === 'search/weather' ? 'search' : lottie.containerClass
    return (
      <div className='tile clickable' onClick={() => navigate(`../${page}`)}>
        <div className='tile-title'>{title}</div>
        <LottieFile
          animationData={lottie.file[page][selectedTheme]}
          containerClass={containerClass}
          height={lottie.height}
          width={lottie.width}
        />
      </div>
    )
  }

  return (
    <div className='home'>
      <div className='greeting-container'>
        <Row justify='center' className='hello'>
          Hello.
        </Row>
        <Row justify='center' className='home-description'>
          <Col span={16}>
            Welcome to my React portfolio application. My name is Kevin Smith and I am a Principal Software Engineer.
            This application demostrates my frontend engineering skills using the ReactJS library. The tech stack is
            ReactJS, Redux Toolkit, Redux Forms, Functional Components, Webpack, ANT Design, SCSS, Theming, and Axios
            for hitting API endpoints. Feel free to explore some of the examples below. I definitely had fun coding the
            pages in this demo application.
          </Col>
        </Row>
        <div className='tile-container'>
          <Tile page='dashboard' title='Dashboard' />
          <Tile page='register' title='Register' />
          <Tile page='grid' title='User Grid' />
          <Tile page='video' title='Videos' />
          <Tile page='list' title='TODO List' />
          <Tile page='search/weather' title='Weather Finder' />
          <Tile page='shop' title='Shop' />
          <Tile page='visuals' title='Visuals' />
        </div>
      </div>
    </div>
  )
}
