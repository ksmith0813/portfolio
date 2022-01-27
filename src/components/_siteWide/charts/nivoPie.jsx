import React from 'react'
import { ResponsivePie } from '@nivo/pie'

export const NivoPie = ({ margin = { top: 150, right: 150, bottom: 150, left: 150 }, hideLegend = false }) => {
  let legends = !hideLegend
    ? [
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 30,
          translateY: -80,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 12,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 20,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]
    : []

  return (
    <ResponsivePie
      data={data}
      margin={margin}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#333333'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      enableArcLinkLabels={true}
      legends={legends}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'Dogs',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'Birds',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'Fish',
          },
          id: 'lines',
        },
      ]}
    />
  )
}

const data = [
  {
    id: 'Dogs',
    label: 'Dogs',
    value: 591,
    color: 'hsl(11, 70%, 50%)',
  },
  {
    id: 'Cats',
    label: 'Cats',
    value: 504,
    color: 'hsl(13, 70%, 50%)',
  },
  {
    id: 'Birds',
    label: 'Birds',
    value: 127,
    color: 'hsl(24, 70%, 50%)',
  },
  {
    id: 'Fish',
    label: 'Fish',
    value: 304,
    color: 'hsl(9, 70%, 50%)',
  },
  {
    id: 'Reptiles',
    label: 'Reptiles',
    value: 156,
    color: 'hsl(330, 70%, 50%)',
  },
]
