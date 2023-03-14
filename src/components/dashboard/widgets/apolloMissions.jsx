import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Col, Timeline } from 'antd'
import shuttle from 'assets/shuttle.svg'
import defaultAstronaut from 'assets/default/astronaut-default.svg'
import greenAstronaut from 'assets/green/astronaut-green.svg'
import purpleAstronaut from 'assets/purple/astronaut-purple.svg'
import { apolloMissions } from 'data/apolloMissions'

export const ApolloMissions = () => {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)
  return (
    <Col span={12} className='pt-200'>
      <Card title='Apollo Space Timeline'>
        <div className='card-display apollo'>
          <Timeline mode='left'>
            {apolloMissions.map((d) => {
              const name = d.name
              const isLanding = name === 'Apollo 11'
              const image = isLanding
                ? selectedTheme === 'default'
                  ? defaultAstronaut
                  : selectedTheme === 'green'
                  ? greenAstronaut
                  : purpleAstronaut
                : shuttle

              return (
                <Timeline.Item
                  key={name}
                  className={isLanding ? 'landing' : ''}
                  label='01-27-1967'
                  dot={<img src={image} className='moon' alt='' />}
                >
                  <b>{name}</b>
                  <p className='pt-050'>{d.description}</p>
                </Timeline.Item>
              )
            })}
          </Timeline>
        </div>
      </Card>
    </Col>
  )
}
