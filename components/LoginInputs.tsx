import { Input } from "antd"
import CustomButton from "./CustomButton"
import React from "react"
import { LoginType } from "@/types/LoginType"

const LoginInputs:React.FC<LoginType> = ({setIsLogin}) => {
  return (
    <>
        <p className="text-base font-normal text-[#3D3D3D] mb-[14px]">Enter your username and password to login.</p>
        <Input size="large" allowClear required name="email" type="email" placeholder="almamun_uxui@outlook.com"/>
        <Input.Password className="mt-4" size="large" allowClear required name="password" type="password" placeholder="***********"/>
        <p className="text-[#46A358] text-end mt-[14px] mb-7">Forgot Password?</p>
    </>
  )
}

export default LoginInputs