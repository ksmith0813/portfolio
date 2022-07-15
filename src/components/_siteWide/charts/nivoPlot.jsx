import React from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { plotData } from 'data/charts/plot'

export const NivoPlot = () => (
  <ResponsiveScatterPlot
    data={plotData}
    margin={{ top: 150, right: 150, bottom: 150, left: 150 }}
    xScale={{ type: 'linear', min: 0, max: 'auto' }}
    xFormat={(e) => {
      return e + ' kg'
    }}
    yScale={{ type: 'linear', min: 0, max: 'auto' }}
    yFormat={(e) => {
      return e + ' cm'
    }}
    blendMode='multiply'
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Weight',
      legendPosition: 'middle',
      legendOffset: 60,
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Size',
      legendPosition: 'middle',
      legendOffset: -75,
    }}
    legends={[
      {
        anchor: 'top',
        direction: 'row',
        justify: false,
        translateX: 30,
        translateY: -80,
        itemWidth: 100,
        itemHeight: 12,
        itemsSpacing: 10,
        itemDirection: 'left-to-right',
        symbolSize: 20,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
)
