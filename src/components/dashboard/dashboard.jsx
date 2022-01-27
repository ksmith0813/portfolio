import React from 'react'
import { MyLocation } from './widgets/myLocation'
import { ApolloMissions } from './widgets/apolloMissions'
import { Breweries } from './widgets/breweries'
import { Transportation } from './widgets/transportation'
import { Election } from './widgets/election'
import { AnimalCategories } from './widgets/animalCategories'
import './dashboard.scss'

export const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <MyLocation />
      <ApolloMissions />
      <Breweries />
      <Transportation />
      <Election />
      <AnimalCategories />
    </div>
  )
}
