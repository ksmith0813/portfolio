import React from 'react'
import { Form } from 'antd'
import { FormFloatLabel } from './formFloatLabel'
import { spacesToProperty } from 'utils/general'

export const FormItem = ({ control, name, error, disabled, ...others }) => (
  <Form.Item
    name={name}
    validateStatus={error && !disabled ? 'error' : 'success'}
    help={error && error.message && !disabled ? error.message : ''}
    {...others}
  >
    {control}
  </Form.Item>
)

export const FormFloat = ({ control, name, label, noFloat, inputValue }) => {
  let input

  if (noFloat) {
    input = control
  } else {
    input = (
      <FormFloatLabel label={label || spacesToProperty(name)} name={name} inputValue={inputValue}>
        {control}
      </FormFloatLabel>
    )
  }

  return input
}
