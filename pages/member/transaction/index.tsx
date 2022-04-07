import jwtDecode from 'jwt-decode';
import Sidebar from '../../../components/organism/Sidebar';
import TransactionContent from '../../../components/organism/TransactionContent';
import { JWTPayloadTypes, UserTypes } from '../../../services_api/data-types';

export default function Transaction() {
  return (
    <>
      <Sidebar activeMenu="transactions" />
      <section className="transactions overflow-auto">
        <TransactionContent />
      </section>
    </>
  );
}


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