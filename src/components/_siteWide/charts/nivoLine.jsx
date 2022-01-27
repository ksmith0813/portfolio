import React from 'react'
import { ResponsiveLine } from '@nivo/line'

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
      data={data}
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

const data = [
  {
    id: 'Japan',
    color: 'hsl(197, 70%, 50%)',
    data: [
      {
        x: 'Plane',
        y: 273,
      },
      {
        x: 'Helicopter',
        y: 291,
      },
      {
        x: 'Boat',
        y: 187,
      },
      {
        x: 'Train',
        y: 228,
      },
      {
        x: 'Subway',
        y: 175,
      },
      {
        x: 'Bus',
        y: 114,
      },
      {
        x: 'Car',
        y: 200,
      },
      {
        x: 'Bicycle',
        y: 20,
      },
      {
        x: 'Skateboard',
        y: 297,
      },
      {
        x: 'Other',
        y: 149,
      },
    ],
  },
  {
    id: 'France',
    color: 'hsl(189, 70%, 50%)',
    data: [
      {
        x: 'Plane',
        y: 114,
      },
      {
        x: 'Helicopter',
        y: 17,
      },
      {
        x: 'Boat',
        y: 46,
      },
      {
        x: 'Train',
        y: 241,
      },
      {
        x: 'Subway',
        y: 76,
      },
      {
        x: 'Bus',
        y: 73,
      },
      {
        x: 'Car',
        y: 16,
      },
      {
        x: 'Bicycle',
        y: 219,
      },
      {
        x: 'Skateboard',
        y: 12,
      },
      {
        x: 'Other',
        y: 41,
      },
    ],
  },
  {
    id: 'Italy',
    color: 'hsl(76, 70%, 50%)',
    data: [
      {
        x: 'Plane',
        y: 80,
      },
      {
        x: 'Helicopter',
        y: 239,
      },
      {
        x: 'Boat',
        y: 176,
      },
      {
        x: 'Train',
        y: 16,
      },
      {
        x: 'Subway',
        y: 204,
      },
      {
        x: 'Bus',
        y: 255,
      },
      {
        x: 'Car',
        y: 20,
      },
      {
        x: 'Bicycle',
        y: 236,
      },
      {
        x: 'Skateboard',
        y: 204,
      },
      {
        x: 'Other',
        y: 133,
      },
    ],
  },
  {
    id: 'Germany',
    color: 'hsl(266, 70%, 50%)',
    data: [
      {
        x: 'Plane',
        y: 98,
      },
      {
        x: 'Helicopter',
        y: 264,
      },
      {
        x: 'Boat',
        y: 14,
      },
      {
        x: 'Train',
        y: 280,
      },
      {
        x: 'Subway',
        y: 6,
      },
      {
        x: 'Bus',
        y: 106,
      },
      {
        x: 'Car',
        y: 139,
      },
      {
        x: 'Bicycle',
        y: 140,
      },
      {
        x: 'Skateboard',
        y: 203,
      },
      {
        x: 'Other',
        y: 180,
      },
    ],
  },
  {
    id: 'Norway',
    color: 'hsl(211, 70%, 50%)',
    data: [
      {
        x: 'Plane',
        y: 233,
      },
      {
        x: 'Helicopter',
        y: 32,
      },
      {
        x: 'Boat',
        y: 213,
      },
      {
        x: 'Train',
        y: 138,
      },
      {
        x: 'Subway',
        y: 43,
      },
      {
        x: 'Bus',
        y: 136,
      },
      {
        x: 'Car',
        y: 211,
      },
      {
        x: 'Bicycle',
        y: 190,
      },
      {
        x: 'Skateboard',
        y: 83,
      },
      {
        x: 'Other',
        y: 271,
      },
    ],
  },
]
