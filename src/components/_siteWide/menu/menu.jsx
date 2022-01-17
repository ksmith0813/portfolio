import React from 'react'
import { Menu as AntdMenu } from 'antd'

export const Menu = ({
  currentPage = 'home',
  onChangePage,
  onLogout,
  items = [],
  theme = 'light',
  mode = 'inline',
  ...others
}) => {
  return (
    <AntdMenu theme={theme} selectedKeys={[currentPage]} mode={mode} onSelect={onChangePage} {...others}>
      {items.map((item) => (
        <AntdMenu.Item key={item.key} title={item.title} icon={item.icon} />
      ))}
    </AntdMenu>
  )
}
