import React from 'react'
import { ResponsiveLine } from '@nivo/line'

export const NivoLine = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 100, right: 150, bottom: 100, left: 150 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    yFormat=' >-.2f'
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Transportation',
      legendOffset: 60,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
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
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
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
    ]}
  />
)

const data = [
  {
    id: 'japan',
    color: 'hsl(197, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 273,
      },
      {
        x: 'helicopter',
        y: 291,
      },
      {
        x: 'boat',
        y: 187,
      },
      {
        x: 'train',
        y: 228,
      },
      {
        x: 'subway',
        y: 175,
      },
      {
        x: 'bus',
        y: 114,
      },
      {
        x: 'car',
        y: 200,
      },
      {
        x: 'moto',
        y: 213,
      },
      {
        x: 'bicycle',
        y: 20,
      },
      {
        x: 'horse',
        y: 261,
      },
      {
        x: 'skateboard',
        y: 297,
      },
      {
        x: 'others',
        y: 149,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(189, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 114,
      },
      {
        x: 'helicopter',
        y: 17,
      },
      {
        x: 'boat',
        y: 46,
      },
      {
        x: 'train',
        y: 241,
      },
      {
        x: 'subway',
        y: 76,
      },
      {
        x: 'bus',
        y: 73,
      },
      {
        x: 'car',
        y: 16,
      },
      {
        x: 'moto',
        y: 24,
      },
      {
        x: 'bicycle',
        y: 219,
      },
      {
        x: 'horse',
        y: 53,
      },
      {
        x: 'skateboard',
        y: 12,
      },
      {
        x: 'others',
        y: 41,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(76, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 80,
      },
      {
        x: 'helicopter',
        y: 239,
      },
      {
        x: 'boat',
        y: 176,
      },
      {
        x: 'train',
        y: 16,
      },
      {
        x: 'subway',
        y: 204,
      },
      {
        x: 'bus',
        y: 255,
      },
      {
        x: 'car',
        y: 20,
      },
      {
        x: 'moto',
        y: 6,
      },
      {
        x: 'bicycle',
        y: 236,
      },
      {
        x: 'horse',
        y: 175,
      },
      {
        x: 'skateboard',
        y: 204,
      },
      {
        x: 'others',
        y: 133,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(266, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 98,
      },
      {
        x: 'helicopter',
        y: 264,
      },
      {
        x: 'boat',
        y: 14,
      },
      {
        x: 'train',
        y: 280,
      },
      {
        x: 'subway',
        y: 6,
      },
      {
        x: 'bus',
        y: 106,
      },
      {
        x: 'car',
        y: 139,
      },
      {
        x: 'moto',
        y: 157,
      },
      {
        x: 'bicycle',
        y: 140,
      },
      {
        x: 'horse',
        y: 135,
      },
      {
        x: 'skateboard',
        y: 203,
      },
      {
        x: 'others',
        y: 180,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(211, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 233,
      },
      {
        x: 'helicopter',
        y: 32,
      },
      {
        x: 'boat',
        y: 213,
      },
      {
        x: 'train',
        y: 138,
      },
      {
        x: 'subway',
        y: 43,
      },
      {
        x: 'bus',
        y: 136,
      },
      {
        x: 'car',
        y: 211,
      },
      {
        x: 'moto',
        y: 136,
      },
      {
        x: 'bicycle',
        y: 190,
      },
      {
        x: 'horse',
        y: 68,
      },
      {
        x: 'skateboard',
        y: 83,
      },
      {
        x: 'others',
        y: 271,
      },
    ],
  },
]
