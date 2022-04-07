import Link from 'next/link';

interface FtGameProps {
    gambar: string,
    title: string,
    title2: string,
    id: string
}
export default function GameItem(props: Partial<FtGameProps>) {
  const { title, title2, gambar, id } = props;
  return (
    <div className="featured-game-card position-relative">
      <Link href={`/detail/${id}`}>
        <a>
          <div className="blur-sharp">
            <img className="thumbnail" src={`${gambar}`} width="205" height="270" alt="" />
          </div>
          <div className="cover position-absolute bottom-0 m-32">
            <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
              <div className="game-icon mx-auto">
                <img src="/icon/game.svg" width="54" height="36" alt="game item" />
              </div>
              <div>
                <p className="fw-semibold text-white text-xl m-0">{title}</p>
                <p className="fw-light text-white m-0">{title2}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>

    </div>
  );
}
