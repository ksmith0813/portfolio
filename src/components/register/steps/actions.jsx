import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { getState, reset, previousStep, complete } from 'store/slices/registerSlice'

export const Actions = ({ form }) => {
  const state = useSelector(getState)
  const dispatch = useDispatch()
  const step = state.step
  return (
    <div className='steps-action'>
      <Button className='mr-100' size='large' onClick={() => dispatch(reset())}>
        Reset
      </Button>
      {step > 0 && (
        <Button className='mr-100' size='large' onClick={() => dispatch(previousStep())}>
          Previous
        </Button>
      )}
      {step < 4 && (
        <Button type='primary' size='large' onClick={() => form.submit()}>
          Next
        </Button>
      )}
      {step === 4 && (
        <Button type='primary' size='large' onClick={() => dispatch(complete())}>
          Submit
        </Button>
      )}
    </div>
  )
}
