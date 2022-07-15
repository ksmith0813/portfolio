import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { lineData } from 'data/charts/line'

export const NivoLine = ({ margin = { top: 150, right: 150, bottom: 150, left: 150 }, hideLegend = false }) => {
  let legends = !hideLegend
    ? [
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
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]
    : []
  return (
    <ResponsiveLine
      data={lineData}
      margin={margin}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      yFormat=' >-.2f'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        legend: 'Transportation',
        legendPosition: 'middle',
        legendOffset: 70,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        legend: 'Count',
        legendOffset: -75,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'paired' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      legends={legends}
    />
  )
}
