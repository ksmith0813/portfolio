import React from 'react'
import { Form, Select } from 'antd'
import { spacesToProperty } from 'utils/general'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'
import { FormFloatLabel } from './formFloatLabel'
import { TagRender } from '../layout/tagRender'

export const FormSelect = ({
  name,
  element,
  setElement,
  initialValue,
  message,
  validator,
  customHandler,
  disabled,
  mode = null,
  label = null,
  property = null,
  section = null,
  required = false,
  options = [],
  width = '100%',
  ...others
}) => {
  const { Option } = Select
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  const select = (
    <FormFloatLabel label={label || spacesToProperty(name)} name={name} inputValue={initialValue}>
      <Select
        value={initialValue}
        onChange={(value) => onChange(value)}
        mode={mode}
        tagRender={mode && TagRender}
        style={{ width: width }}
        {...others}
      >
        {options.map((o, i) => (
          <Option key={i} value={o.value}>
            {o.text}
          </Option>
        ))}
      </Select>
    </FormFloatLabel>
  )

  if (error) {
    return (
      <Form.Item name={name} validateStatus='error' help={error.message}>
        {select}
      </Form.Item>
    )
  }

  return (
    <Form.Item name={name} help={disabled && ''}>
      {select}
    </Form.Item>
  )
}
