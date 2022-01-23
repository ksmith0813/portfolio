import React from 'react'
import { Form, Switch } from 'antd'

export const FormSwitch = ({
  name,
  checked,
  disabled,
  checkedValue = 'Yes',
  uncheckedValue = 'No',
  onChange,
  ...others
}) => {
  return (
    <Form.Item name={name}>
      <Switch
        checked={checked}
        disabled={disabled}
        checkedChildren={checkedValue}
        unCheckedChildren={uncheckedValue}
        onChange={() => onChange()}
        {...others}
      />
    </Form.Item>
  )
}
