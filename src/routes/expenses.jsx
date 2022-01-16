import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

export const Expenses = () => {
  return (
    <div className='m-200' style={{ height: 'calc(100vh - 200px)' }}>
      <ResponsiveBar
        data={data}
        keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy='country'
        margin={{ top: 100, right: 150, bottom: 100, left: 150 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat={{ format: '', enabled: false }}
        colors={{ scheme: 'paired' }}
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
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Country',
          legendPosition: 'middle',
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
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
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
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
    </div>
  )
}

const data = [
  {
    country: 'AD',
    'hot dog': 52,
    'hot dogColor': 'hsl(105, 70%, 50%)',
    burger: 195,
    burgerColor: 'hsl(66, 70%, 50%)',
    sandwich: 66,
    sandwichColor: 'hsl(14, 70%, 50%)',
    kebab: 98,
    kebabColor: 'hsl(314, 70%, 50%)',
    fries: 159,
    friesColor: 'hsl(318, 70%, 50%)',
    donut: 119,
    donutColor: 'hsl(344, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 164,
    'hot dogColor': 'hsl(335, 70%, 50%)',
    burger: 135,
    burgerColor: 'hsl(181, 70%, 50%)',
    sandwich: 111,
    sandwichColor: 'hsl(247, 70%, 50%)',
    kebab: 140,
    kebabColor: 'hsl(115, 70%, 50%)',
    fries: 116,
    friesColor: 'hsl(284, 70%, 50%)',
    donut: 121,
    donutColor: 'hsl(276, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 50,
    'hot dogColor': 'hsl(122, 70%, 50%)',
    burger: 56,
    burgerColor: 'hsl(3, 70%, 50%)',
    sandwich: 124,
    sandwichColor: 'hsl(31, 70%, 50%)',
    kebab: 176,
    kebabColor: 'hsl(172, 70%, 50%)',
    fries: 16,
    friesColor: 'hsl(258, 70%, 50%)',
    donut: 54,
    donutColor: 'hsl(313, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 31,
    'hot dogColor': 'hsl(187, 70%, 50%)',
    burger: 3,
    burgerColor: 'hsl(261, 70%, 50%)',
    sandwich: 72,
    sandwichColor: 'hsl(149, 70%, 50%)',
    kebab: 10,
    kebabColor: 'hsl(37, 70%, 50%)',
    fries: 88,
    friesColor: 'hsl(18, 70%, 50%)',
    donut: 193,
    donutColor: 'hsl(258, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 131,
    'hot dogColor': 'hsl(252, 70%, 50%)',
    burger: 58,
    burgerColor: 'hsl(149, 70%, 50%)',
    sandwich: 151,
    sandwichColor: 'hsl(113, 70%, 50%)',
    kebab: 165,
    kebabColor: 'hsl(289, 70%, 50%)',
    fries: 139,
    friesColor: 'hsl(24, 70%, 50%)',
    donut: 7,
    donutColor: 'hsl(58, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 112,
    'hot dogColor': 'hsl(47, 70%, 50%)',
    burger: 38,
    burgerColor: 'hsl(330, 70%, 50%)',
    sandwich: 114,
    sandwichColor: 'hsl(56, 70%, 50%)',
    kebab: 18,
    kebabColor: 'hsl(109, 70%, 50%)',
    fries: 188,
    friesColor: 'hsl(88, 70%, 50%)',
    donut: 143,
    donutColor: 'hsl(331, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 143,
    'hot dogColor': 'hsl(350, 70%, 50%)',
    burger: 7,
    burgerColor: 'hsl(325, 70%, 50%)',
    sandwich: 84,
    sandwichColor: 'hsl(239, 70%, 50%)',
    kebab: 36,
    kebabColor: 'hsl(39, 70%, 50%)',
    fries: 166,
    friesColor: 'hsl(322, 70%, 50%)',
    donut: 84,
    donutColor: 'hsl(57, 70%, 50%)',
  },
]
