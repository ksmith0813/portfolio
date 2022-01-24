import React, { useState } from 'react'
import { AutoComplete, Form } from 'antd'
import { spacesToProperty } from 'utils/general'
import { validateProperty } from './validators/_baseValidator'
import { getError, handleFormChange } from './util'
import { FormFloatLabel } from './formFloatLabel'

export const FormAutoComplete = ({
  name,
  element,
  setElement,
  initialValue,
  message,
  validator,
  customHandler,
  label = null,
  property = null,
  section = null,
  required = false,
  options = [],
  width = '100%',
  ...others
}) => {
  const [foundOptions, setFoundOptions] = useState(options)
  const error = element && getError(name, element)

  const onChange = (value) => {
    let updated = handleFormChange(name, property, value, element)
    customHandler && customHandler(value, updated)
    validateProperty(validator, updated, name, property, required, section)
    setElement(updated)
  }

  return (
    <Form.Item
      name={name}
      validateStatus={error ? 'error' : 'validating'}
      help={error ? error.message : ''}
      rules={[{ required: required, message: message }]}
    >
      <FormFloatLabel label={label || spacesToProperty(name)} name={name} inputValue={initialValue}>
        <AutoComplete
          value={initialValue}
          options={foundOptions}
          onChange={(value) => onChange(value)}
          onSearch={(v) => {
            if (v) {
              v = v.toLowerCase()
              const filteredOptions = options.filter((o) => o.value.toLowerCase().includes(v))
              setFoundOptions(filteredOptions)
            } else {
              setFoundOptions(options)
            }
          }}
          style={{ width: width }}
          {...others}
        />
      </FormFloatLabel>
    </Form.Item>
  )
}
