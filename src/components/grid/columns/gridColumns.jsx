import React from 'react'
import moment from 'moment'
import { Avatar } from 'antd'
import { sortAlphebetically } from 'utils/general'
import { countries } from 'data/countries'

export const getColumns = () => {
  return [
    {
      title: 'Picture',
      dataIndex: 'picture',
      noFilter: true,
      noSort: true,
      width: 80,
      render: (value) => <Avatar src={value} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      type: 'text',
      width: 150,
      sorter: (a, b) => sortAlphebetically(a, b, 'name'),
      render: (value) => <b>{value}</b>,
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      type: 'text',
      width: 150,
      sorter: (a, b) => sortAlphebetically(a, b, 'userName'),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      type: 'autoComplete',
      width: 150,
      options: countries,
      sorter: (a, b) => sortAlphebetically(a, b, 'country'),
    },
    {
      title: 'State',
      dataIndex: 'state',
      type: 'text',
      width: 200,
      sorter: (a, b) => sortAlphebetically(a, b, 'state'),
    },
    {
      title: 'City',
      dataIndex: 'city',
      type: 'text',
      width: 200,
      sorter: (a, b) => sortAlphebetically(a, b, 'city'),
    },
    {
      title: 'Postal Code',
      dataIndex: 'postalCode',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.postalCode - b.postalCode,
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.latitude - b.latitude,
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.longitude - b.longitude,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      type: 'text',
      width: 150,
    },
    {
      title: 'Register Date',
      dataIndex: 'registerDate',
      type: 'date',
      width: 200,
      render: (value) => moment(value).format('MM/DD/YYYY'),
      sorter: (a, b) => moment(a.registerDate) - moment(b.registerDate),
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dateOfBirth',
      type: 'date',
      width: 200,
      render: (value) => moment(value).format('MM/DD/YYYY'),
      sorter: (a, b) => moment(a.dateOfBirth) - moment(b.dateOfBirth),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.age - b.age,
    },
  ]
}
