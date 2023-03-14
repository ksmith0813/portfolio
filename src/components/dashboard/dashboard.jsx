import React from 'react'
import { MyLocation } from './widgets/myLocation'
import { ApolloMissions } from './widgets/apolloMissions'
import { Breweries } from './widgets/breweries'
import { FoodByCountry } from './widgets/foodByCountry'
import { Election } from './widgets/election'
import './dashboard.scss'

export const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <MyLocation />
      <Election />
      <Breweries />
      <ApolloMissions />
      <FoodByCountry />
    </div>
  )
}
