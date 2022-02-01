import React, { useState } from 'react'
import { Card, Col, Button } from 'antd'
import { NivoBar } from 'components/_siteWide/charts/nivoBar'

export const FoodByCountry = () => {
  const [selected, setSelected] = useState('2019')
  const setPrimary = (year) => (selected === year ? 'primary' : '')
  const dataButtons = (
    <>
      <Button type={setPrimary('2019')} onClick={() => setSelected('2019')}>
        2019
      </Button>
      <Button type={setPrimary('2020')} onClick={() => setSelected('2020')} className='ml-100'>
        2020
      </Button>
      <Button type={setPrimary('2021')} onClick={() => setSelected('2021')} className='ml-100'>
        2021
      </Button>
    </>
  )

  const data = selected === '2019' ? threeYearData : selected === '2020' ? twoYearData : oneYearData
  return (
    <Col span={12} className='pt-200'>
      <Card title={<span className='fs-125'>Food By Country</span>} extra={dataButtons}>
        <div className='card-display'>
          <NivoBar customData={data} margin={{ top: 80, right: 80, bottom: 80, left: 80 }} translateY={-60} />
        </div>
      </Card>
    </Col>
  )
}

const threeYearData = [
  {
    country: 'Norway',
    'Hot Dog': 38,
    'hot dogColor': 'hsl(105, 70%, 50%)',
    Burger: 230,
    BurgerColor: 'hsl(66, 70%, 50%)',
    Sandwich: 45,
    SandwichColor: 'hsl(14, 70%, 50%)',
    Fries: 175,
    FriesColor: 'hsl(318, 70%, 50%)',
    Donut: 78,
    DonutColor: 'hsl(344, 70%, 50%)',
  },
  {
    country: 'Germany',
    'Hot Dog': 144,
    'Hot DogColor': 'hsl(335, 70%, 50%)',
    Burger: 175,
    BurgerColor: 'hsl(181, 70%, 50%)',
    Sandwich: 131,
    SandwichColor: 'hsl(247, 70%, 50%)',
    Fries: 146,
    FriesColor: 'hsl(284, 70%, 50%)',
    Donut: 151,
    DonutColor: 'hsl(276, 70%, 50%)',
  },
  {
    country: 'Italy',
    'Hot Dog': 70,
    'Hot DogColor': 'hsl(122, 70%, 50%)',
    Burger: 76,
    BurgerColor: 'hsl(3, 70%, 50%)',
    Sandwich: 144,
    SandwichColor: 'hsl(31, 70%, 50%)',
    Fries: 46,
    FriesColor: 'hsl(258, 70%, 50%)',
    Donut: 84,
    DonutColor: 'hsl(313, 70%, 50%)',
  },
  {
    country: 'France',
    'Hot Dog': 51,
    'Hot DogColor': 'hsl(187, 70%, 50%)',
    Burger: 23,
    BurgerColor: 'hsl(261, 70%, 50%)',
    Sandwich: 92,
    SandwichColor: 'hsl(149, 70%, 50%)',
    Fries: 110,
    FriesColor: 'hsl(18, 70%, 50%)',
    Donut: 173,
    DonutColor: 'hsl(258, 70%, 50%)',
  },
  {
    country: 'Japan',
    'Hot Dog': 161,
    'Hot DogColor': 'hsl(252, 70%, 50%)',
    Burger: 78,
    BurgerColor: 'hsl(149, 70%, 50%)',
    Sandwich: 171,
    SandwichColor: 'hsl(113, 70%, 50%)',
    Fries: 159,
    FriesColor: 'hsl(24, 70%, 50%)',
    Donut: 37,
    DonutColor: 'hsl(58, 70%, 50%)',
  },
  {
    country: 'Iceland',
    'Hot Dog': 152,
    'Hot DogColor': 'hsl(47, 70%, 50%)',
    Burger: 78,
    BurgerColor: 'hsl(330, 70%, 50%)',
    Sandwich: 164,
    SandwichColor: 'hsl(56, 70%, 50%)',
    Fries: 198,
    FriesColor: 'hsl(88, 70%, 50%)',
    Donut: 173,
    DonutColor: 'hsl(331, 70%, 50%)',
  },
  {
    country: 'Russia',
    'Hot Dog': 153,
    'Hot DogColor': 'hsl(350, 70%, 50%)',
    Burger: 39,
    BurgerColor: 'hsl(325, 70%, 50%)',
    Sandwich: 94,
    SandwichColor: 'hsl(239, 70%, 50%)',
    Fries: 156,
    FriesColor: 'hsl(322, 70%, 50%)',
    Donut: 54,
    DonutColor: 'hsl(57, 70%, 50%)',
  },
]

const twoYearData = [
  {
    country: 'Norway',
    'Hot Dog': 152,
    'hot dogColor': 'hsl(105, 70%, 50%)',
    Burger: 155,
    BurgerColor: 'hsl(66, 70%, 50%)',
    Sandwich: 36,
    SandwichColor: 'hsl(14, 70%, 50%)',
    Fries: 119,
    FriesColor: 'hsl(318, 70%, 50%)',
    Donut: 139,
    DonutColor: 'hsl(344, 70%, 50%)',
  },
  {
    country: 'Germany',
    'Hot Dog': 174,
    'Hot DogColor': 'hsl(335, 70%, 50%)',
    Burger: 115,
    BurgerColor: 'hsl(181, 70%, 50%)',
    Sandwich: 89,
    SandwichColor: 'hsl(247, 70%, 50%)',
    Fries: 126,
    FriesColor: 'hsl(284, 70%, 50%)',
    Donut: 99,
    DonutColor: 'hsl(276, 70%, 50%)',
  },
  {
    country: 'Italy',
    'Hot Dog': 77,
    'Hot DogColor': 'hsl(122, 70%, 50%)',
    Burger: 112,
    BurgerColor: 'hsl(3, 70%, 50%)',
    Sandwich: 88,
    SandwichColor: 'hsl(31, 70%, 50%)',
    Fries: 66,
    FriesColor: 'hsl(258, 70%, 50%)',
    Donut: 33,
    DonutColor: 'hsl(313, 70%, 50%)',
  },
  {
    country: 'France',
    'Hot Dog': 104,
    'Hot DogColor': 'hsl(187, 70%, 50%)',
    Burger: 20,
    BurgerColor: 'hsl(261, 70%, 50%)',
    Sandwich: 62,
    SandwichColor: 'hsl(149, 70%, 50%)',
    Fries: 189,
    FriesColor: 'hsl(18, 70%, 50%)',
    Donut: 33,
    DonutColor: 'hsl(258, 70%, 50%)',
  },
  {
    country: 'Japan',
    'Hot Dog': 141,
    'Hot DogColor': 'hsl(252, 70%, 50%)',
    Burger: 78,
    BurgerColor: 'hsl(149, 70%, 50%)',
    Sandwich: 111,
    SandwichColor: 'hsl(113, 70%, 50%)',
    Fries: 179,
    FriesColor: 'hsl(24, 70%, 50%)',
    Donut: 11,
    DonutColor: 'hsl(58, 70%, 50%)',
  },
  {
    country: 'Iceland',
    'Hot Dog': 88,
    'Hot DogColor': 'hsl(47, 70%, 50%)',
    Burger: 78,
    BurgerColor: 'hsl(330, 70%, 50%)',
    Sandwich: 124,
    SandwichColor: 'hsl(56, 70%, 50%)',
    Fries: 148,
    FriesColor: 'hsl(88, 70%, 50%)',
    Donut: 99,
    DonutColor: 'hsl(331, 70%, 50%)',
  },
  {
    country: 'Russia',
    'Hot Dog': 133,
    'Hot DogColor': 'hsl(350, 70%, 50%)',
    Burger: 47,
    BurgerColor: 'hsl(325, 70%, 50%)',
    Sandwich: 94,
    SandwichColor: 'hsl(239, 70%, 50%)',
    Fries: 116,
    FriesColor: 'hsl(322, 70%, 50%)',
    Donut: 55,
    DonutColor: 'hsl(57, 70%, 50%)',
  },
]

const oneYearData = [
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
