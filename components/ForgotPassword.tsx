import { Input } from 'antd'
import React from 'react'

const ForgotPassword = () => {
  return (
    <div>
        <Input className='my-5' size='large' allowClear required name='email' type='email' placeholder='Enter your email'/>
    </div>
  )
}

export default ForgotPassword