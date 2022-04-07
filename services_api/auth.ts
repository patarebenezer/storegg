import axios from "axios";
import callAPI from "../config/api";
import { LoginTypes, SignUpTypes } from "./data-types";

//pemanggilan API
const ROOT_API = process.env.NEXT_PUBLIC_API
const API_VER = 'api'

export async function setSignUp(data: FormData){
    const URL = 'auth/signup'
    //menggunakan catch jika terjadi error
    //di err.response akan dimasukan ke variable response, sehingga bisa digunakan di sign up page
    const response = await axios.post(`${ROOT_API}/${API_VER}/${URL}`, data).catch(err => err.response);
    const axiosResponse = response.data
    
    //jika response sukses makan axiosResponse.data dapat diakses, 
    //jika gagal maka axiosResponse.data tidak dapat digunakan
    if(axiosResponse?.error === 1){ // jika error
        return axiosResponse
    }
    return axiosResponse.data // jika sukses
}

export async function setLogin(data: LoginTypes){
    const url = `${ROOT_API}/${API_VER}/auth/signin`
    return callAPI({
        url,
        method:'POST',
        data,
    })
}
