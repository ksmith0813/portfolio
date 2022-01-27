import React, { useState, useEffect } from 'react'
import { Card, Col, Table } from 'antd'
import api from 'utils/api'

export const Breweries = () => {
  const [breweries, setBreweries] = useState([])

  useEffect(() => {
    api.getBreweries().then(({ data }) => {
      setBreweries(data)
    })
  }, [])

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

  return (
    <Col span={12} className='pl-200'>
      <Card title='Breweries'>
        <div className='card-display'>
          <Table rowKey='id' dataSource={breweries} columns={columns} pagination={false} scroll={{ y: 417 }} />
        </div>
      </Card>
    </Col>
  )
}
