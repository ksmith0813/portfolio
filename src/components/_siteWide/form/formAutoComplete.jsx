import React, { useRef, useState, useEffect, forwardRef } from 'react'
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
  focus,
  options = [],
  width = '100%',
  ...others
}) => {
  const inputRef = useRef(null)
  const [foundOptions, setFoundOptions] = useState(options)
  const error = element && getError(name, element)

  useEffect(() => {
    focus && inputRef.current?.focus()
  }, [focus])

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
        <ControlInput
          ref={inputRef}
          value={initialValue}
          options={foundOptions}
          onChange={onChange}
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

const ControlInput = forwardRef((props, ref) => (
  <AutoComplete
    ref={ref}
    value={props.value}
    options={props.options}
    onChange={(v) => props.onChange(v)}
    onSearch={props.onSearch}
    style={{ width: props.width }}
    {...props.others}
  />
))
