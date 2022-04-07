import jwtDecode from 'jwt-decode';
import TransactionDetailContent from '../../../components/organism/TransactionDetailContent';
import { HistroyTransactionTypes, JWTPayloadTypes, UserTypes } from '../../../services_api/data-types';
import { getTransactionDetail } from '../../../services_api/member';

interface TransactionDetailProps {
  transactionDetail: HistroyTransactionTypes
}

export default function Detail(props: TransactionDetailProps) {
  const { transactionDetail } = props
  return (
    <>
      <section className="transactions-detail overflow-auto">
        <TransactionDetailContent data={transactionDetail}/>
      </section>
    </>
  );
}

// cek login pake cara serve side:
// sebelum checkout harus login dulu
interface GetServerSideProps{
  req:{
    cookies:{
      token:string,
    }
  },
  params:{
    idTrx: string
  }
}
export async function getServerSideProps({req, params}: GetServerSideProps){ // context berisi req , res dll
  // params berguna untuk ambil id di web browser
  const {idTrx} = params
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
  const response = await getTransactionDetail(idTrx, jwtToken) // ambil data dari parameter di web browser
  return {
    props:{
      transactionDetail: response.data //casenya sudah login
    }
  }
}