import React from 'react'
import { ResponsiveWaffle } from '@nivo/waffle'

export const NivoWaffle = () => (
  <ResponsiveWaffle
    data={data}
    total={100}
    rows={18}
    columns={14}
    margin={{ top: 120, right: 150, bottom: 150, left: 150 }}
    colors={{ scheme: 'set3' }}
    borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
    animate
    motionStiffness={90}
    motionDamping={11}
    legends={[
      {
        anchor: 'top',
        direction: 'row',
        justify: false,
        translateX: 30,
        translateY: -50,
        itemsSpacing: 10,
        itemWidth: 100,
        itemHeight: 12,
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        itemTextColor: '#777',
        symbolSize: 20,
        symbolShape: 'circle',
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
    id: 'Dogs',
    label: 'Dogs',
    value: 40,
  },
  {
    id: 'Cats',
    label: 'Cats',
    value: 25,
  },
  {
    id: 'Birds',
    label: 'Birds',
    value: 10,
  },
  {
    id: 'Fish',
    label: 'Fish',
    value: 15,
  },
  {
    id: 'Reptiles',
    label: 'Reptiles',
    value: 10,
  },
]
