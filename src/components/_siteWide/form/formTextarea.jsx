import React from 'react'
import { Form } from 'antd'
import { spacesToProperty } from 'utils/general'
import { validateProperty } from './validators/_baseValidator'
import { getError, getRules, handleFormChange } from './util'
import { FormFloatLabel } from './formFloatLabel'

export const FormTextArea = ({
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
  width = '100%',
  height = '200px',
}) => {
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  let inputContent = (
    <textarea
      value={initialValue}
      disabled={disabled}
      onChange={(value) => onChange(value)}
      className={`${noFloat ? 'no-float' : ''}`}
      style={{ width: width, height: height }}
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
      <Form.Item name={name} validateStatus='error' help={error.message} style={{ height: height }}>
        {input}
      </Form.Item>
    )
  }

  return (
    <Form.Item
      name={name}
      rules={[!disabled && getRules(name, required)]}
      help={disabled && ''}
      style={{ height: height }}
    >
      {input}
    </Form.Item>
  )
}
