import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Col, Timeline } from 'antd'
import shuttle from 'assets/shuttle.svg'
import defaultAstronaut from 'assets/default/astronaut-default.svg'
import greenAstronaut from 'assets/green/astronaut-green.svg'
import purpleAstronaut from 'assets/purple/astronaut-purple.svg'
import { apolloMissions } from 'data/apolloMissions'
import { getState } from 'store/slices/themeSlice'

export const ApolloMissions = () => {
  const state = useSelector(getState)
  const theme = state.selectedTheme
  return (
    <Col span={6} className='pt-200 pl-200'>
      <Card title='Apollo Space Timeline'>
        <div className='card-display apollo'>
          <Timeline mode='left'>
            {apolloMissions.map((d) => (
              <Timeline.Item
                key={d.name}
                className={d.name === 'Apollo 11' ? 'landing' : ''}
                label='01-27-1967'
                dot={
                  <img
                    src={
                      d.name === 'Apollo 11'
                        ? theme === 'default'
                          ? defaultAstronaut
                          : theme === 'green'
                          ? greenAstronaut
                          : purpleAstronaut
                        : shuttle
                    }
                    className='moon'
                    alt=''
                  />
                }
              >
                <b>{d.name}</b>
                <p className='pt-050'>{d.description}</p>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </Card>
    </Col>
  )
}
