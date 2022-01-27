import React from 'react'
import { ApolloMissions } from './widgets/apolloMissions'
import './dashboard.scss'
import { AnimalCategories } from './widgets/animalCategories'
import { Election } from './widgets/election'
import { Breweries } from './widgets/breweries'
import { Transportation } from './widgets/transportation'

export const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <>
        <AnimalCategories />
        <ApolloMissions />
        <Breweries />
        <Election />
        <Transportation />
      </>
    </div>
  )
}
