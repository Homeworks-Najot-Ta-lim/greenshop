import { RegisterVerifyType } from '@/types/RegisterVerify'
import { Input } from 'antd'
import React from 'react'

const RegisterVerify:React.FC<RegisterVerifyType> = ({setRegistirationCode}) => {
  return (
    <div className='text-center my-5'>
        <Input.OTP onChange={(e)=>setRegistirationCode(e)} size='large'/>
    </div>
  )
}

export default RegisterVerify