import { JWTPayloadTypes, UserTypes } from '../../../services_api/data-types';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [ user, setUser ] = useState({
    avatar:'',
    name:'',
    email:''
  })
  const public_img = process.env.NEXT_PUBLIC_IMG
  useEffect(() => {
    //ambil token dari cookies, name key nya : token
    const token = Cookies.get('token');
    if(token){
      //atob berguna untuk decode token dari btoa
      const jwtToken = atob(token)
      const payload : JWTPayloadTypes = jwtDecode(jwtToken)
      const userFromPayload : UserTypes = payload.player
      user.avatar = `${userFromPayload.avatar}`
      setUser(userFromPayload)
    }
    
  }, [])
  return (
    <div className="user text-center pb-50 pe-30">
      <img
        className="img-fluid mb-20 gambar"
        src={`${public_img}/${user.avatar}`}
        alt=""
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}
