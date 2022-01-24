import React from 'react'
import { Input, Form } from 'antd'
import { spacesToProperty } from 'utils/general'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'
import { FormFloatLabel } from './formFloatLabel'

export const FormInput = ({
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
  isPassword,
  width = '100%',
  ...others
}) => {
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element, isNumber)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  let inputContent = isPassword ? (
    <Input.Password
      value={initialValue}
      disabled={disabled}
      onChange={onChange}
      autoComplete='off'
      className={`${noFloat ? 'no-float' : ''}`}
      style={{ width: width }}
      {...others}
    />
  ) : (
    <Input
      value={initialValue}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
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

  return (
    <Form.Item name={name} help={disabled && ''}>
      {input}
    </Form.Item>
  )
}
