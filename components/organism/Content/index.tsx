import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { HistroyTransactionTypes, TopupCategoriesTypes } from '../../../services_api/data-types';
import { getMemberOverview } from '../../../services_api/member';
import CategoriesItem from '../../moleculs/CategoriesItem';
import TableRow from './TableRow';

export default function Content() {
  const [ count, setCount ] = useState([])
  const [ data, setData ] = useState([])

  //pemanggilan API dengan async lebih bagus menggunakan callback
  const getMemberOverviewAPI = useCallback( async () => {
    const response = await getMemberOverview()
    if(response.error){
      toast.error(response.message)
    }else{
      setCount(response.data.count)
      setData(response.data.data)
    }
  },[])
  
  useEffect(() => {
    getMemberOverviewAPI()
  }, [])
  const IMG = process.env.NEXT_PUBLIC_IMG
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
          <div className="main-content">
            <div className="row">
              {count.map((item: TopupCategoriesTypes) => {
                return (
                  <CategoriesItem key={item._id} money={item.value} image="icon-game">
                    {item.name}
                  </CategoriesItem>
                )
              })}
              
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">Game</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: HistroyTransactionTypes) => (
                  <TableRow
                  key={item._id}
                  gambar={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                  game={item.historyVoucherTopup.gameName}
                  gametype={item.historyVoucherTopup.category}
                  item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                  price={item.value}
                  status={item.status}
                />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
