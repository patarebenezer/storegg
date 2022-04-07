import { useCallback, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import ButtonTab from '../../../pages/member/transaction/ButtonTab';
import { HistroyTransactionTypes } from '../../../services_api/data-types';
import { getMemberTransactions } from '../../../services_api/member';
import TableRow from './TableRow';

export default function TransactionContent() {
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)
  const [btnTab, setBtnTab] = useState('all')
  const getMemberTransactionsAPI = useCallback(async(value) => {
    const response = await getMemberTransactions(value)
    if(response.error){
      toast.error(response.message)
    }else{
      setTransactions(response.data.data)
      setTotal(response.data.total)
    }

  }, [])
  useEffect(() => {
    getMemberTransactionsAPI('all')
  }, [])

  const onTabClick = (value:string) => {
    setBtnTab(value)
    getMemberTransactionsAPI(value)
  }
  const img = process.env.NEXT_PUBLIC_IMG
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
          <NumberFormat
            value={total}
            prefix="Rp."
            displayType="text"
            thousandSeparator='.'
            decimalSeparator="," />
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              {/*  set active button untuk menampilkan data yg berbeda */}
              <ButtonTab onClick={() => onTabClick('all')} title="All Trx" active={btnTab === 'all'} />
              <ButtonTab onClick={() => onTabClick('success')} title="Success" active={btnTab === 'success'} />
              <ButtonTab onClick={() => onTabClick('pending')} title="Pending" active={btnTab === 'pending'} />
              <ButtonTab onClick={() => onTabClick('failed')} title="Failed" active={btnTab === 'failed'} />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">Game</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {transactions.map((transaction: HistroyTransactionTypes) => {
                  return(
                    <TableRow
                      id={transaction._id}
                      key={transaction._id}
                      gambar={`${img}/${transaction.historyVoucherTopup.thumbnail}`}
                      title={transaction.historyVoucherTopup.gameName}
                      category={transaction.historyVoucherTopup.category}
                      item={`${transaction.historyVoucherTopup.coinQuantity} ${transaction.historyVoucherTopup.coinName}`}
                      price={transaction.value}
                      status={transaction.status}
                    />
                  )
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
