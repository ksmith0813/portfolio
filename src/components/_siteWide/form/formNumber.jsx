import React from 'react'
import { InputNumber, Form } from 'antd'
import { spacesToProperty } from 'utils/general'
import { validateProperty } from './validators/_baseValidator'
import { getError, getRules, handleFormChange } from './util'
import { FormFloatLabel } from './formFloatLabel'

export const FormNumber = ({
  name,
  element,
  setElement,
  initialValue,
  validator,
  customHandler,
  disabled,
  label = null,
  property = null,
  section = null,
  noFloat = false,
  required = false,
  isNumber = false,
  isCurrency = false,
  width = '100%',
}) => {
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element, isNumber)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  let inputContent = (
    <InputNumber
      value={initialValue}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      precision={2}
      formatter={(value) => `${isCurrency ? '$' : ''}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      autoComplete='off'
      className={`${noFloat ? 'no-float' : ''}`}
      style={{ width: width }}
      {...others}
    />
  )

  let input

  if (noFloat) {
    input = inputContent
  } else {
    input = (
      <FormFloatLabel label={label || spacesToProperty(name)} name={name} inputValue={initialValue}>
        {inputContent}
      </FormFloatLabel>
    )
  }

  if (error) {
    return (
      <Form.Item name={name} validateStatus='error' help={error.message}>
        {input}
      </Form.Item>
    )
  }

  if (!error && !validator) {
    return <Form.Item name={name}>{input}</Form.Item>
  }

  return (
    <Form.Item name={name} rules={[!disabled && getRules(name, required)]}>
      {input}
    </Form.Item>
  )
}
