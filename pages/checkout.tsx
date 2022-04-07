import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import CheckoutItem from '../components/moleculs/CheckoutItem';
import CheckoutConfirm from '../components/moleculs/CheckoutItem/CheckoutConfirm';
import CheckoutDetail from '../components/moleculs/CheckoutItem/CheckoutDetail';
import { JWTPayloadTypes, UserTypes } from '../services_api/data-types';

interface CheckoutProps{
  user: UserTypes
}

export default function checkout(props: CheckoutProps) { //dapat menerima value user menjadi props dari pemanggilan server side dibawah
  const { user } = props
  
  return (
    <>
      <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
        <div className="container-fluid">
          <div className="logo text-md-center text-start pb-50">
            <a className="" href="#">
              <Image src="/icon/logo.svg" width={60} height={60} alt="Logo" />
            </a>
          </div>
          <div className="title-text pt-md-50 pt-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
            <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
          </div>
          <CheckoutItem />
          <hr />
          <CheckoutDetail />
          <CheckoutConfirm />
        </div>
      </section>
    </>
  );
}

// ##################################################################################
//private route: jika belum login maka tiba bisa akses menu
// cek login pake cara serve side:
// sebelum checkout harus login dulu
interface GetServerSideProps{
  req:{
    cookies:{
      token:string
    }
  }
}
export async function getServerSideProps({req}: GetServerSideProps){ // context berisi req , res dll
  //cek sudah login atau belum
  // cek cookiesnya
  const { token } = req.cookies //cek ada tokennya atau enggak
  if(!token){ //jika token tidak ada atau undifined
    return{
      redirect:{
        destination:'/sign-in',
        permantent: false//tidak bersifat permanen

      }
    }
  }
  const jwtToken = Buffer.from(token, 'base64').toString('ascii') // ubah token jadi bisa di decode(untuk server side)
  const payload: JWTPayloadTypes = jwtDecode(jwtToken)
  const userFromPayload: UserTypes = payload.player
  const IMG = process.env.NEXT_PUBLIC_IMG
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`
  return {
    props:{
      user: userFromPayload //casenya sudah login
    }
  }
}