import axios from "axios"
import { API } from "./get_api"

export const instance = ()=>{
    return axios.create({baseURL: API})
}