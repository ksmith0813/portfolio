import { isArray } from 'utils/general'
import { getRequiredMessage } from '../util'

export const validateProperty = (
  validator,
  form,
  property,
  nestedProperty = null,
  required = false,
  section = null
) => {
  let value
  let propertyName = property

  if (isArray(property)) {
    propertyName = property[1]
    value = form[nestedProperty][property[0]][propertyName]
  } else {
    value = form[property]
  }

  form.errors = form.errors.filter((e) => e.property !== propertyName)
  let error

  if (nestedProperty) {
    const values = form[nestedProperty]
    if (values) {
      values.map((v, i) => {
        error = null
        if (required && !v[propertyName]) error = getRequiredMessage(propertyName)
        else if (validator) error = validator(v[propertyName], form, property)
        if (error) return addError(form, propertyName, error, section, nestedProperty, i)
        return v
      })
    }
  } else {
    if (validator) error = validator(value, form, property)
    if (!value && !error && required) error = getRequiredMessage(propertyName)
    if (error) addError(form, propertyName, error, section)
  }
}

export const addError = (form, property, error, section = null, nestedProperty = null, index = null) => {
  form.errors.push({
    property: property,
    nestedProperty: nestedProperty,
    message: error,
    section: section,
    index: index
  })
}
