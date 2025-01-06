"use client"

import { BasketIcon, LoginIcon, SearchIcon } from "@/icons";
import { NavListType } from "@/types/NavListType";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { Modal } from "antd";
import { FormEvent, useContext, useState } from "react";
import LoginInputs from "./LoginInputs";
import { instance } from "@/hook/intance";
import RegisterInputs from "./RegisterInputs";
import RegisterVerify from "./RegisterVerify";
import { Context } from "@/context/TokenContext";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { toast } from "react-toastify";


const Header = () => {
  const {setToken} = useContext(Context)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<"login" | "register" | "register-verify" | "forgot-password" | "reset-password">("login")
  const [registerEmail, setRegisterEmail] = useState<string | null>(null)
  const [registirationCode,setRegistirationCode] = useState<string | null>(null)
  const [forgotEmail,setForgotEmail] = useState<string | null>(null)
  const [resetPasswordCode,setResetPasswordCode] = useState<string | null>(null)
  const navList: NavListType[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "Plant Care",
      path: "/plant-care",
    },
    {
      title: "Blogs",
      path: "/blogs",
    },
  ];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(isLogin==="login"){
      const data = {
        usernameoremail: (e.target as HTMLFormElement).email.value,
        password: (e.target as HTMLFormElement).password.value,
    }
    instance().post("/login",data).then(res=>{
      setOpenModal(false)
      setToken(res.data.access_token)
      toast.success("Welcome GREENSHOP")
    })
    } else if(isLogin==="register"){
      const confirmPassword = (e.target as HTMLFormElement).confirmPassword.value
      const data = {
        email: (e.target as HTMLFormElement).email.value,
        firstName: (e.target as HTMLFormElement).username.value,
        lastName: (e.target as HTMLFormElement).username.value,
        password: (e.target as HTMLFormElement).password.value,
      };
      if(data.password !== confirmPassword){
        toast.warning("Password and Confirm passwords are not the same")
        return
      }
      instance().post("/register",data).then(res=>{
        setIsLogin("register-verify")
        setRegisterEmail(data.email)
      }).catch((error)=>{
        toast.warning(error.response.data.message)
      })
    } else if (isLogin === "register-verify"){
      const data = {
        email: registerEmail,
        code: registirationCode,
      };
      instance().post("/users/verify",{},{params: data}).then(res=>{
        setIsLogin("login")
        toast.success("Successful, you can log in.")
      })
    } else if(isLogin==="forgot-password"){
      const email = (e.target as HTMLFormElement).email.value
      instance().post(`/forgot/${email}`).then(res=>{
        setForgotEmail(email)
        setIsLogin("reset-password")
      })
    } else if(isLogin =="reset-password"){
      const data = {
        email: forgotEmail,
        new_password: (e.target as HTMLFormElement).newPassword.value,
        otp: resetPasswordCode,
      }
      console.log(data)
      instance().put("/reset-password",data).then(res=>{
        setIsLogin("login")
      })
    }
  }

  return (
    <>
      <header className="pt-[25px]">
        <div className="w-[1200px] mx-auto px-[10px] flex items-center justify-between">
          <Image
            style={{ width: "150px", height: "34px" }}
            priority
            src={"/logo.svg"}
            alt="Site Logo"
            width={150}
            height={34}
          />

          <nav className="space-x-[50px]">
            {navList.map((item: NavListType, index: number) => (
              <Link
                className="font-normal text-[16px] leading-[20px]"
                key={index}
                href={`${item.path}`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-[30px]">
            <button>
              <SearchIcon />
            </button>
            <button>
              <BasketIcon />
            </button>
            <CustomButton type="button" onClick={() => setOpenModal(true)} leftIcon={<LoginIcon />} title="Login" />
          </div>
        </div>
      </header>
      <Modal footer="" open={openModal} onCancel={() =>setOpenModal(false)}>
            <ul className="flex items-center justify-center gap-3 cursor-pointer">
                <li onClick={() => setIsLogin("login")} className={`text-[20px] font-medium  ${isLogin === "login" ? "text-[#46A358]" : "text-[#3D3D3D]"}`}>Login</li>
                <li className="w-[1.2px] h-4 bg-[#3D3D3D]"></li>
                <li onClick={() => setIsLogin("register")} className={`text-[20px] font-medium ${isLogin === "register" ? "text-[#46A358]" : "text-[#3D3D3D]"}`}>Register</li>
            </ul>
            <form onSubmit={handleSubmit}>
                {isLogin == "login" && <LoginInputs setIsLogin={setIsLogin}/>}
                {isLogin == "register" && <RegisterInputs />}
                {isLogin =="register-verify" && <RegisterVerify setRegistirationCode={setRegistirationCode}/>}
                {isLogin =="forgot-password" && <ForgotPassword/>}
                {isLogin == "reset-password" && <ResetPassword setResetPasswordCode={setResetPasswordCode}/>}
                <CustomButton type="submit" extraClass="!w-full !py-4 !font-bold !text-[16px]" title={isLogin == "login" ? "Login":(isLogin=="register" ? "Register" : (isLogin=="register-verify"?"Verify":"Send"))} />
            </form>
      </Modal>

    </>
  );
};

export default Header;
