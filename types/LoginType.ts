import React, { SetStateAction } from "react";

export interface LoginType{
    setIsLogin: React.Dispatch<SetStateAction<"login" | "register"| "register-verify">>
}

//  | "register-verify" | "forgot-password" | "reset-password"