import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import { getState } from 'store/slices/themeSlice'
// Default Theme images
import dashboardData from 'assets/default/dashboard-tile-default.json'
import registerData from 'assets/default/register-tile-default.json'
import gridData from 'assets/default/grid-tile-default.json'
import movieData from 'assets/default/movie-tile-default.json'
import listData from 'assets/default/list-tile-default.json'
import weatherData from 'assets/default/weather-tile-default.json'
import shopData from 'assets/default/shop-tile-default.json'
import chartData from 'assets/default/chart-tile-default.json'

// Green Theme Images
import dashboardGreenData from 'assets/green/dashboard-tile-green.json'
import registerGreenData from 'assets/green/register-tile-green.json'
import gridGreenData from 'assets/green/grid-tile-green.json'
import movieGreenData from 'assets/green/movie-tile-green.json'
import listGreenData from 'assets/green/list-tile-green.json'
import weatherGreenData from 'assets/green/weather-tile-green.json'
import shopGreenData from 'assets/green/shop-tile-green.json'
import chartGreenData from 'assets/green/chart-tile-green.json'
import { LottieFile } from 'components/_siteWide/animation/lottieFile'
import './home.scss'

export const Home = () => {
  const [loading, setLoading] = useState(false)
  const [activePage, setActivePage] = useState()
  const navigate = useNavigate()
  const state = useSelector(getState)
  const theme = state.selectedTheme

  const goToPage = (page) => {
    setLoading(true)
    setActivePage(page)
    setTimeout(() => navigate(`../${page}`), 3000)
  }

  const getLottieData = (page) => {
    let data = { containerClass: page }
    switch (page) {
      case 'dashboard':
        data.file = theme === 'default' ? dashboardData : dashboardGreenData
        break
      case 'register':
        data.file = theme === 'default' ? registerData : registerGreenData
        break
      case 'grid':
        data.file = theme === 'default' ? gridData : gridGreenData
        break
      case 'video':
        data.file = theme === 'default' ? movieData : movieGreenData
        break
      case 'list':
        data.file = theme === 'default' ? listData : listGreenData
        break
      case 'search/weather':
        data.file = theme === 'default' ? weatherData : weatherGreenData
        data.containerClass = 'search'
        break
      case 'shop':
        data.file = theme === 'default' ? shopData : shopGreenData
        break
      default:
        data.file = theme === 'default' ? chartData : chartGreenData
        data.containerClass = 'visuals'
        break
    }
  
    return data
  }

  const Tile = ({ page, title }) => {
    const lottie = getLottieData(page)
    return (
      <div className='tile clickable' onClick={() => goToPage(page)}>
        <div className='tile-title'>{title}</div>
        <LottieFile
          animationData={lottie.file}
          containerClass={lottie.containerClass}
          autoplay={loading && page === activePage}
          height={lottie.height}
          width={lottie.width}
        />
      </div>
    )
  }
  
  return (
    <>
      <div className={`home ${theme}`}>
        <Row justify='center' className='hello'>
          Hello.
        </Row>
        <Row justify='center' className='home-description'>
          <Col span={12}>
            My name is Kevin Smith, nice to meet you. Welcome to my React portfolio application. This site demonstrates
            my ability as a senior frontend software engineer. The tech stack is ReactJS, Redux, Functional Components,
            ANT Design, SCSS, and Axios for hitting API endpoints. Feel free to explore some of the examples below, I
            definitely had some fun coding the pages in this demo application.
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
    </>
  )
}
