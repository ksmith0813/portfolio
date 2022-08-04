import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import { getState } from 'store/slices/themeSlice'
import { LottieFile } from 'components/_siteWide/animation/lottieFile'
import { data } from './data'
import './home.scss'

export const Home = () => {
  const navigate = useNavigate()
  const state = useSelector(getState)
  const theme = state.selectedTheme

  const goToPage = (page) => navigate(`../${page}`)

  const Tile = ({ page, title }) => {
    const lottie = data(page)
    const containerClass = page === 'search/weather' ? 'search' : lottie.containerClass
    return (
      <div className='tile clickable' onClick={() => goToPage(page)}>
        <div className='tile-title'>{title}</div>
        <LottieFile
          animationData={lottie.file[page][theme]}
          containerClass={containerClass}
          height={lottie.height}
          width={lottie.width}
        />
      </div>
    )
  }

  return (
    <div className={`home ${theme}`}>
      <Row justify='center' className='hello'>
        Hello.
      </Row>
      <Row justify='center' className='home-description'>
        <Col span={12}>
          Welcome to my React portfolio application. My name is Kevin Smith and I am a Principal React Developer. This
          application demostrates my frontend engineering skills using the ReactJS library. The tech stack is ReactJS,
          Redux Toolkit, Redux Forms, Functional Components, Webpack, ANT Design, SCSS, Theming, and Axios for hitting
          API endpoints. Feel free to explore some of the examples below. I definitely had fun coding the pages in this
          demo application.
        </Col>
      </Row>
      <div className='tile-container'>
        <Row justify='center'>
          <Tile page='dashboard' title='Dashboard' image={`theme/${theme}/dashboard-tile-${theme}.svg`} />
          <Tile page='register' title='Register' image={`theme/${theme}/register-tile-${theme}.svg`} />
          <Tile page='grid' title='User Grid' image={`theme/${theme}/grid-tile-${theme}.svg`} />
          <Tile page='video' title='Videos' image={`theme/${theme}/movie-tile-${theme}.svg`} className='media' />
        </Row>
        <Row justify='center'>
          <Tile page='list' title='TODO List' image={`theme/${theme}/list-tile-${theme}.svg`} />
          <Tile
            page='search/weather'
            title='Weather Finder'
            image={`theme/${theme}/umbrella-tile-${theme}.svg`}
            className='weather'
          />
          <Tile page='shop' title='Shop' image={`theme/${theme}/shop-tile-${theme}.svg`} />
          <Tile page='visuals' title='Visuals' image={`theme/${theme}/chart-tile-${theme}.svg`} />
        </Row>
      </div>
    </div>
  )
}
