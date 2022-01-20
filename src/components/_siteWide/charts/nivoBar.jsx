import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

export const NivoBar = () => (
  <ResponsiveBar
    data={data}
    keys={['Burger', 'Sandwich', 'Fries', 'Hot Dog', 'Donut']}
    indexBy='country'
    margin={{ top: 150, right: 150, bottom: 150, left: 150 }}
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
        translateY: -80,
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

const data = [
  {
    country: 'Norway',
    'Hot Dog': 52,
    'hot dogColor': 'hsl(105, 70%, 50%)',
    Burger: 195,
    BurgerColor: 'hsl(66, 70%, 50%)',
    Sandwich: 66,
    SandwichColor: 'hsl(14, 70%, 50%)',
    Fries: 159,
    FriesColor: 'hsl(318, 70%, 50%)',
    Donut: 119,
    DonutColor: 'hsl(344, 70%, 50%)',
  },
  {
    country: 'Germany',
    'Hot Dog': 164,
    'Hot DogColor': 'hsl(335, 70%, 50%)',
    Burger: 135,
    BurgerColor: 'hsl(181, 70%, 50%)',
    Sandwich: 111,
    SandwichColor: 'hsl(247, 70%, 50%)',
    Fries: 116,
    FriesColor: 'hsl(284, 70%, 50%)',
    Donut: 121,
    DonutColor: 'hsl(276, 70%, 50%)',
  },
  {
    country: 'Italy',
    'Hot Dog': 50,
    'Hot DogColor': 'hsl(122, 70%, 50%)',
    Burger: 56,
    BurgerColor: 'hsl(3, 70%, 50%)',
    Sandwich: 124,
    SandwichColor: 'hsl(31, 70%, 50%)',
    Fries: 16,
    FriesColor: 'hsl(258, 70%, 50%)',
    Donut: 54,
    DonutColor: 'hsl(313, 70%, 50%)',
  },
  {
    country: 'France',
    'Hot Dog': 31,
    'Hot DogColor': 'hsl(187, 70%, 50%)',
    Burger: 3,
    BurgerColor: 'hsl(261, 70%, 50%)',
    Sandwich: 72,
    SandwichColor: 'hsl(149, 70%, 50%)',
    Fries: 88,
    FriesColor: 'hsl(18, 70%, 50%)',
    Donut: 193,
    DonutColor: 'hsl(258, 70%, 50%)',
  },
  {
    country: 'Japan',
    'Hot Dog': 131,
    'Hot DogColor': 'hsl(252, 70%, 50%)',
    Burger: 58,
    BurgerColor: 'hsl(149, 70%, 50%)',
    Sandwich: 151,
    SandwichColor: 'hsl(113, 70%, 50%)',
    Fries: 139,
    FriesColor: 'hsl(24, 70%, 50%)',
    Donut: 7,
    DonutColor: 'hsl(58, 70%, 50%)',
  },
  {
    country: 'Iceland',
    'Hot Dog': 112,
    'Hot DogColor': 'hsl(47, 70%, 50%)',
    Burger: 38,
    BurgerColor: 'hsl(330, 70%, 50%)',
    Sandwich: 114,
    SandwichColor: 'hsl(56, 70%, 50%)',
    Fries: 188,
    FriesColor: 'hsl(88, 70%, 50%)',
    Donut: 143,
    DonutColor: 'hsl(331, 70%, 50%)',
  },
  {
    country: 'Russia',
    'Hot Dog': 143,
    'Hot DogColor': 'hsl(350, 70%, 50%)',
    Burger: 7,
    BurgerColor: 'hsl(325, 70%, 50%)',
    Sandwich: 84,
    SandwichColor: 'hsl(239, 70%, 50%)',
    Fries: 166,
    FriesColor: 'hsl(322, 70%, 50%)',
    Donut: 84,
    DonutColor: 'hsl(57, 70%, 50%)',
  },
]
