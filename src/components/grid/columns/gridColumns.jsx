import React from 'react'
import { Avatar } from 'antd'
import { sortAlphebetically } from 'utils/general'
import moment from 'moment'
import { countries } from 'constants/countries'

export const getColumns = () => {
  return [
    {
      title: 'Picture',
      dataIndex: 'Picture',
      noFilter: true,
      noSort: true,
      width: 80,
      render: (value) => <Avatar src={value} />,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      type: 'text',
      width: 150,
      sorter: (a, b) => sortAlphebetically(a, b, 'Name'),
      render: (value) => <b>{value}</b>,
    },
    {
      title: 'Username',
      dataIndex: 'UserName',
      type: 'text',
      width: 150,
      sorter: (a, b) => sortAlphebetically(a, b, 'UserName'),
    },
    {
      title: 'Country',
      dataIndex: 'Country',
      type: 'autoComplete',
      width: 150,
      options: countries,
      sorter: (a, b) => sortAlphebetically(a, b, 'Country'),
    },
    {
      title: 'State',
      dataIndex: 'State',
      type: 'text',
      width: 200,
      sorter: (a, b) => sortAlphebetically(a, b, 'State'),
    },
    {
      title: 'City',
      dataIndex: 'City',
      type: 'text',
      width: 200,
      sorter: (a, b) => sortAlphebetically(a, b, 'City'),
    },
    {
      title: 'Postal Code',
      dataIndex: 'PostalCode',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.PostalCode - b.PostalCode,
    },
    {
      title: 'Latitude',
      dataIndex: 'Latitude',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.Latitude - b.Latitude,
    },
    {
      title: 'Longitude',
      dataIndex: 'Longitude',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.Longitude - b.Longitude,
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      type: 'text',
      width: 150,
    },
    {
      title: 'Register Date',
      dataIndex: 'RegisterDate',
      type: 'date',
      width: 200,
      render: (value) => moment(value).format('MM/DD/YYYY'),
      sorter: (a, b) => moment(a.RegisterDate) - moment(b.RegisterDate),
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'DateOfBirth',
      type: 'date',
      width: 200,
      render: (value) => moment(value).format('MM/DD/YYYY'),
      sorter: (a, b) => moment(a.DateOfBirth) - moment(b.DateOfBirth),
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      type: 'text',
      width: 100,
      sorter: (a, b) => a.Age - b.Age,
    },
  ]
}
