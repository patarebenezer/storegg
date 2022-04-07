import cx from 'classnames';
import Link from 'next/link';
import NumberFormat from 'react-number-format';

interface TransactionProps{
    title:string,
    gambar: string,
    category: string,
    item: string,
    price: number,
    status: string,
    id: string
}

export default function TableRow(props: TransactionProps) {
  const {
    title, gambar, category, item, price, status, id
  } = props;
  const statusTransaction = cx({
    'float-start icon-status': true,
    pending: status === 'pending',
    success: status === 'success',
    failed: status === 'failed',
  });
  return (
    <tr data-category="pending" className="align-middle">
      <th scope="row">
        <img
          className="float-start me-3 mb-lg-0 mb-3"
          src={gambar}
          width="80"
          height="60"
          alt=""
        />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">
            {title}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">{category}</p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">
          {item}
        </p>
      </td>
      <td>
        <p className="fw-medium color-palette-1 m-0">
        <NumberFormat
            value={price}
            prefix="Rp."
            displayType="text"
            thousandSeparator='.'
            decimalSeparator="," />
        </p>
      </td>
      <td>
        <div>
          <span className={statusTransaction} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {status}
          </p>
        </div>
      </td>
      <td>
        <Link href={`/member/transaction/${id}`}>
          <a
            className="btn btn-status rounded-pill text-sm"
          >
            Details
          </a>
        </Link>
      </td>
    </tr>
  );
}
