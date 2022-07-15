import React, { useState } from 'react'
import { Card, Col, Button } from 'antd'
import { NivoBar } from 'components/_siteWide/charts/nivoBar'
import { yearOneFood, yearThreeFood, yearTwoFood } from 'data/foodByYear'

export const FoodByCountry = () => {
  const [selected, setSelected] = useState('2019')
  const setPrimary = (year) => (selected === year ? 'primary' : '')
  const data = selected === '2019' ? yearThreeFood : selected === '2020' ? yearTwoFood : yearOneFood
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

  return (
    <Col span={12} className='pt-200'>
      <Card title='Food By Country' extra={dataButtons}>
        <div className='card-display'>
          <NivoBar customData={data} margin={{ top: 80, right: 80, bottom: 80, left: 80 }} translateY={-60} />
        </div>
      </Card>
    </Col>
  )
}
