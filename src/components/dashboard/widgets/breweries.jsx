import React, { useState, useEffect } from 'react'
import { AutoComplete, Card, Col, Table } from 'antd'
import api from 'utils/api'
import { onAutoCompleteSearch } from 'utils/general'

export const Breweries = () => {
  const [loading, setLoading] = useState(false)
  const [allBreweries, setAllBreweries] = useState([])
  const [breweries, setBreweries] = useState([])
  const [allCities, setAllCities] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    setLoading(true)
    api.getBreweries().then(({ data }) => {
      setBreweries(data)
      setAllBreweries(data)
      const uniqueCities = [...new Set(data.map((d) => d.city).sort())].map((c) => {
        return { value: c }
      })
      setCities(uniqueCities)
      setAllCities(uniqueCities)
      setLoading(false)
    })
  }, [])

  const onCityChange = (value) => {
    let copy = [...allBreweries]
    if (value) copy = copy.filter((c) => c.city === value)
    setSelectedCity(value)
    setBreweries(copy)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'brewery_type',
    },
    {
      title: 'Address',
      dataIndex: 'street',
    },
    {
      title: 'City',
      dataIndex: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
    {
      title: 'Zip',
      dataIndex: 'postal_code',
    },
  ]

  const cityAutoComplete = (
    <AutoComplete
      value={selectedCity}
      options={cities}
      onChange={onCityChange}
      onSearch={(value) => onAutoCompleteSearch(value, allCities, setCities)}
      style={{ width: '170px' }}
      allowClear
    />
  )

  return (
    <Col span={12} className='pl-200'>
      <Card
        title='Breweries'
        extra={
          <>
            <span className='pr-100'>City</span>
            <span>{cityAutoComplete}</span>
          </>
        }
      >
        <div className='card-display'>
          <Table
            rowKey='id'
            dataSource={breweries}
            columns={columns}
            loading={loading}
            pagination={false}
            scroll={{ y: 417 }}
          />
        </div>
      </Card>
    </Col>
  )
}
