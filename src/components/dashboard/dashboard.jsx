import React from 'react'
import { ApolloMissions } from './widgets/apolloMissions'
import { AnimalCategories } from './widgets/animalCategories'
import { Election } from './widgets/election'
import { Breweries } from './widgets/breweries'
import { Transportation } from './widgets/transportation'
import './dashboard.scss'

export const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <AnimalCategories />
      <ApolloMissions />
      <Breweries />
      <Election />
      <Transportation />
    </div>
  )
}
