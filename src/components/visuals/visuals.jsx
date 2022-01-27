import React, { useState } from 'react'
import { NivoBar } from 'components/_siteWide/charts/nivoBar'
import { NivoPie } from 'components/_siteWide/charts/nivoPie'
import { NivoLine } from 'components/_siteWide/charts/nivoLine'
import { NivoPlot } from 'components/_siteWide/charts/nivoPlot'
import { NivoWaffle } from 'components/_siteWide/charts/nivoWaffle'
import { Categories } from 'components/_siteWide/layout/categories'
import './visuals.scss'

export const Visuals = () => {
  const [selectedChart, setSelectedChart] = useState('bar')
  const categories = ['bar', 'line', 'plot', 'pie', 'waffle']

  const changeChart = (value) => setSelectedChart(value)
  
  return (
    <>
      <div className='category-container'>
        <Categories items={categories} selected={selectedChart} onClick={changeChart} />
      </div>
      <div className='chart-display'>
        {selectedChart === 'bar' && <NivoBar />}
        {selectedChart === 'line' && <NivoLine />}
        {selectedChart === 'pie' && <NivoPie />}
        {selectedChart === 'plot' && <NivoPlot />}
        {selectedChart === 'waffle' && <NivoWaffle />}
      </div>
    </>
  )
}
