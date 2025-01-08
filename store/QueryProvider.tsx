"use client"
import {ReactNode, useState} from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
export const QueryProvider =({children}: {children: ReactNode})=>{
    const [queryClient] = useState(()=> new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                staleTime: 1000*60*5,
                // @ts-ignore
                cacheTime: 1000*60*10,
                refetchOnWindowFocus: true
            }
        }
    })) 

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}