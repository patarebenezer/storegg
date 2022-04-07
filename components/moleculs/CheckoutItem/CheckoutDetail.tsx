import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

export default function CheckoutDetail() {
  const [dataTopup, setDataTopup] = useState({
    verifyID: '',
    nominalItem: {
      coinQuantity: 0,
      price: 0,
      coinName: '',
      _id: ''
    },
    paymentItem: {
      payment: {
        _id: '',
        type: ''
      },
      bank: {
        name: '',
        bankName: '',
        noRekening: '',
      }
    },
    bankAccountName: ''
  })
  useEffect(() => {
    const dataFromLocal = localStorage.getItem('data-topup')
    const dataTopupLocal = JSON.parse(dataFromLocal!)
    setDataTopup(dataTopupLocal)
  }, [])
  const totalPrice = dataTopup.nominalItem.price + dataTopup.nominalItem.price * (10 / 100)
  return (
    <>
      <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Game ID
          <span
            className="purchase-details"
          >
            {dataTopup.verifyID}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Order ID
          <span className="purchase-details">#GG001</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Item
          <span className="purchase-details">{dataTopup.nominalItem.coinQuantity} {dataTopup.nominalItem.coinName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Price
          <span className="purchase-details">
            <NumberFormat
              value={dataTopup.nominalItem.price}
              prefix="Rp. " displayType="text"
              thousandSeparator='.'
              decimalSeparator=","
            />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%)
          <span className="purchase-details">
            <NumberFormat
              value={dataTopup.nominalItem.price * (10 / 100)}
              prefix="Rp. " displayType="text"
              thousandSeparator='.'
              decimalSeparator=","
            />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total
          <span className="purchase-details color-palette-4">
            <NumberFormat
              value={totalPrice}
              prefix="Rp. " displayType="text"
              thousandSeparator='.'
              decimalSeparator=","
            />
          </span>
        </p>
      </div>

      <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account Name
          <span className="purchase-details">
            {dataTopup.bankAccountName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Type
          <span className="payment-details">{dataTopup.paymentItem.payment.type}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Name
          <span className="payment-details">{dataTopup.paymentItem.bank.bankName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name
          <span className="payment-details">
            {dataTopup.paymentItem.bank.name}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number
          <span className="payment-details">
            {dataTopup.paymentItem.bank.noRekening}
          </span>
        </p>
      </div>
    </>
  );
}