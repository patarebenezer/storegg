interface FooterProps {
    title?: string,
    item1?: string,
    item2?: string,
    item3?: string
}
export default function FooterItem(props: Partial<FooterProps>) {
  const {
    title, item1, item2, item3,
  } = props;
  return (
    <ul className="list-unstyled">
      <li className="mb-6">
        <a href="/#" className="text-lg color-palette-1 text-decoration-none">{title}</a>
      </li>
      <li className="mb-6">
        <a href="/#" className="text-lg color-palette-1 text-decoration-none">
          {item1}
        </a>
      </li>
      <li className="mb-6">
        <a href="/#" className="text-lg color-palette-1 text-decoration-none">{item2}</a>
      </li>
      <li className="mb-6">
        <a href="/#" className="text-lg color-palette-1 text-decoration-none">
          {item3}
        </a>
      </li>
    </ul>
  );
}
