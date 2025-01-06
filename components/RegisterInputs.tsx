import { Input } from 'antd'
import React from 'react'

const RegisterInputs = () => {
  return (
    <div>
<p className="text-base font-normal text-[#3D3D3D] mb-[14px]">Enter your Email and Password</p>
<Input className='mb-[18px]' size="large" allowClear required name="username" type="text"  placeholder="Username"/>
<Input size="large" allowClear required name="email" type="email" placeholder="Email"/>
 <Input.Password className="mt-[17px]" size="large" allowClear required name="password" type="password" placeholder="Password"/>
 <Input.Password className="my-[17px]" size="large" allowClear required name="confirmPassword" type="password" placeholder="Confirm Password"/>
    </div>
  )
}

export default RegisterInputs