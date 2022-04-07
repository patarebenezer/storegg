import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';

interface MenuProps {
  title: string,
  gambar: string,
  active?: boolean,
  href?: string,
  onClick?: () => void
}
export default function MenuItem(props: Partial<MenuProps>) {
  const {
    title, gambar, active, href='/', onClick
  } = props;
  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  });
  return (
    <div className={classItem} onClick={onClick}>
      <div className="me-3">
        <Image src={`/icon/${gambar}.svg`} width={25} height={25} alt="icon-menu" />
      </div>
      <p className="item-title m-0">
        {onClick ? ( // jika props onclick ada 
          <a className="text-lg text-decoration-none">{title}</a>
        ): ( // jika tidak ada
          <Link href={href}>
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </p>
    </div>
  );
}
