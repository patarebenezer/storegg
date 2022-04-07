import cx from 'classnames';

interface ButtonProps{
    title: string,
    active: boolean,
    onClick: () => void
}
export default function ButtonTab(props: ButtonProps) {
  const { title, active, onClick } = props;
  const statusButton = cx({
    'btn btn-status rounded-pill text-sm me-3': true,
    'btn-active': active,
  });
  return (
    <button type='button' onClick={onClick} className={statusButton}>
      {title}
    </button>
  );
}
