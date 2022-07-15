import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { barData } from 'data/charts/bar'

export const NivoBar = ({
  customData,
  margin = { top: 150, right: 150, bottom: 150, left: 150 },
  translateY = -80,
}) => (
  <ResponsiveBar
    data={customData || barData}
    keys={['Burger', 'Sandwich', 'Fries', 'Hot Dog', 'Donut']}
    indexBy='country'
    margin={margin}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    valueFormat={{ format: '', enabled: false }}
    colors={{ scheme: 'set3' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: 'Fries',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'Sandwich',
        },
        id: 'lines',
      },
    ]}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 0,
      tickPadding: 20,
      tickRotation: 0,
      legend: 'Country',
      legendPosition: 'middle',
      legendOffset: 70,
    }}
    axisLeft={{
      tickSize: 0,
      tickPadding: 20,
      tickRotation: 0,
      legend: 'Food',
      legendPosition: 'middle',
      legendOffset: -75,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'top',
        direction: 'row',
        justify: false,
        translateX: 30,
        translateY: translateY,
        itemWidth: 100,
        itemHeight: 12,
        itemsSpacing: 20,
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
