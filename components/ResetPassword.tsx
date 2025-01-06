import { ResetPasswordType } from '@/types/ResetPasswordType'
import { Input } from 'antd'
import React from 'react'

const ResetPassword:React.FC<ResetPasswordType> = ({setResetPasswordCode}) => {
  return (
    <div className='my-5'>
        <Input.Password size='large' allowClear required name='newPassword' type='password' placeholder='Enter new password'/>
        <label className='mt-2 inline-block'>
            Enter your code: <Input.OTP onChange={(e)=>setResetPasswordCode(e)} size='large'/>
        </label>
    </div>
  )
}

export default ResetPassword