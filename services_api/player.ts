import axios from "axios";
import callAPI from "../config/api";
import { CheckoutTypes } from "./data-types";

//pemanggilan API
const ROOT_API = process.env.NEXT_PUBLIC_API
const API_VER = 'api'

export async function getFeaturedGame(){
    const URL = 'players/landingpage'
    const response = await axios.get(`${ROOT_API}/${API_VER}/${URL}`);
    const axiosResponse = response.data
    return axiosResponse.data
}

export async function getDetailVoucher(id: string){
    const URL = `players/${id}/detail`
    const response = await axios.get(`${ROOT_API}/${API_VER}/${URL}`);
    const axiosResponse = response.data
    return axiosResponse.data
}

export async function getGameCategory() {
    const URL = `players/category`
    const response = await axios.get(`${ROOT_API}/${API_VER}/${URL}`);
    const axiosResponse = response.data
    return axiosResponse.data
}

export async function setCheckout(data:CheckoutTypes) {
    const url = `${ROOT_API}/${API_VER}/players/checkout`
    return callAPI({
        url,
        method:'POST',
        data,
        token:true
    })
}


