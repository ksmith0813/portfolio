import { Form } from 'antd'
import { spacesToProperty } from 'utils/general'
import { FormFloatLabel } from './formFloatLabel'

export const FormItem =
  (Component) =>
  ({ input, defaultValue, validator, initialValues, required, meta, children, hasFeedback, ...rest }) => {
    let error
    if (!initialValues) {
      if (validator) error = validator(defaultValue)
      if (required) {
        if ((Array.isArray(defaultValue) && !defaultValue.length) || !defaultValue) error = 'Required'
      }
    }

    input.value = defaultValue
    return (
      <Form.Item validateStatus={error ? 'error' : 'success'} hasFeedback={hasFeedback && error} help={error}>
        <FormFloatLabel label={spacesToProperty(input.name)} name={input.name} inputValue={input.value}>
          <Component {...input} {...rest} children={children} />
        </FormFloatLabel>
      </Form.Item>
    )
  }
