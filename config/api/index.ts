import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";


interface callAPIProps extends AxiosRequestConfig{
    token?: boolean,
    serverToken?: string
}
export default async function callAPI({url, method, data, token, serverToken} : callAPIProps){ //  berguna biar kita ga define satu satu
    //.post dimatikan supaya jadi lebih dinamis
    let headers = {}
    //jika params serverToken dari web browser ada: 
    if(serverToken){
        headers = {
            Authorization: `Bearer ${serverToken}`
        }
    }else if(token){ //kalo tidak ada, pake yg client side
        const tokenDariCookies = Cookies.get('token');
        if(tokenDariCookies){
            const jwtToken = atob(tokenDariCookies)
            headers = {
                Authorization: `Bearer ${jwtToken}`
            }
        }
    }
    
    
    const response = await axios({
        url,
        method,
        data,
        headers
    }).catch((err) => err.response);

    if(response.status > 300){
        const res = {
            error: true,
            message: response.data.message,
            data:null
        }
        return res
    }
        const res = {
            error: false,
            message: 'success',
            data: response.data.data,
        }
        return res
}