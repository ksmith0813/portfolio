import React from 'react'
import { Button } from 'antd'
import { useRegisterContext } from '../context/registerContext'

export const Actions = ({ form = {} }) => {
    const { step, previousStep, complete} = useRegisterContext()

    return (
      <div className='steps-action'>
        {step > 0 && (
          <Button className='mr-100' size='large' onClick={() => previousStep()}>
            Previous
          </Button>
        )}
        {step < 4 && (
          <Button type='primary' size='large' onClick={() => form.submit()}>
            Next
          </Button>
        )}
        {step === 4 && (
          <Button type='primary' size='large' onClick={() => complete()}>
            Done
          </Button>
        )}
      </div>
    )
}