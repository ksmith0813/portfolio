import React, { useState } from 'react'
import { Tag } from 'antd'
import { NivoBar } from 'components/_siteWide/charts/nivoBar'
import { NivoPie } from 'components/_siteWide/charts/nivoPie'
import { NivoLine } from 'components/_siteWide/charts/nivoLine'
import { NivoPlot } from 'components/_siteWide/charts/nivoPlot'
import { NivoWaffle } from 'components/_siteWide/charts/nivoWaffle'
import './charts.scss'

export const Charts = () => {
  const [selectedChart, setSelectedChart] = useState('bar')
  const categories = ['bar', 'line', 'plot', 'pie', 'waffle']

  const handleChange = (value) => setSelectedChart(value)

  return (
    <>
      <div className='category-container'>
        {categories.map((c, i) => (
          <Tag className={`${selectedChart === c && 'selected'} clickable`} key={i} onClick={() => handleChange(c)}>
            {c}
          </Tag>
        ))}
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
