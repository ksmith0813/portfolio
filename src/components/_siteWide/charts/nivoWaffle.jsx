import React from 'react'
import { ResponsiveWaffle } from '@nivo/waffle'
import { waffleData } from 'data/charts/waffle'

export const NivoWaffle = () => (
  <ResponsiveWaffle
    data={waffleData}
    total={100}
    rows={18}
    columns={14}
    margin={{ top: 120, right: 150, bottom: 150, left: 150 }}
    colors={{ scheme: 'nivo' }}
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
