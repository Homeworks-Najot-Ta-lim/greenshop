"use client"

import { ContextType } from "@/types/ContextType"
import React, { createContext, ReactNode, useState } from "react"

export const Context = createContext<ContextType>({
    token: "",
    setToken: ()=>""
})

export const ContextProvider: React.FC<{children: ReactNode}> = ({children})=>{
    const [token, setToken] = useState<null | string>(localStorage.getItem("token") || null)
    if(token) localStorage.setItem("token",token)
    return <Context.Provider value={{token, setToken}}>{children}</Context.Provider>
}