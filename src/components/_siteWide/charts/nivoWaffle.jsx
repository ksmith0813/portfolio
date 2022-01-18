import React from 'react'
import { ResponsiveWaffle } from '@nivo/waffle'

export const NivoWaffle = () => (
  <ResponsiveWaffle
    data={data}
    total={100}
    rows={18}
    columns={14}
    margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
    colors={{ scheme: 'paired' }}
    borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
    animate
    motionStiffness={90}
    motionDamping={11}
    legends={[
      {
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 0,
        translateY: 0,
        itemsSpacing: 10,
        itemWidth: 300,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        itemTextColor: '#777',
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
              itemBackground: '#f7fafb',
            },
          },
        ],
      },
    ]}
  />
)

const data = [
  {
    id: 'Birds',
    label: 'Birds',
    value: 15,
  },
  {
    id: 'Dogs',
    label: 'Dogs',
    value: 60,
  },
  {
    id: 'Cats',
    label: 'Cats',
    value: 25,
  },
]
