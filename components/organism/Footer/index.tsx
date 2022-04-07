import Image from 'next/image';
import FooterItem from '../../moleculs/FooterItem';

export default function Footer() {
  return (
    <section className="footer pt-50">
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 text-lg-start text-center">
              <a href="/#" className="mb-30">
                <Image src="/icon/logo.svg" height={60} width={60} />
              </a>
              <p className="mt-30 text-lg color-palette-1 mb-30">
                StoreGG membantu gamers
                <br />
                {' '}
                untuk menjadi
                pemenang sejati
              </p>
              <p className="mt-30 text-lg color-palette-1 mb-30">Copyright 2021. All Rights Reserved.</p>
            </div>
            <div className="col-lg-8 mt-lg-0 mt-20">
              <div className="row gap-sm-0">
                <div className="col-md-4 col-6 mb-lg-0 mb-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">Company</p>
                  <FooterItem title="About Us" item3="Privacy & Policy" item1="Press Release" item2="Terms Of Use" />
                </div>
                <div className="col-md-4 col-6 mb-lg-0 mb-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">Support</p>
                  <FooterItem item1="Refund Policy" item2="Unlock Rewards" item3="Live Chatting" />
                </div>
                <div className="col-md-4 col-12 mt-lg-0 mt-md-0 mt-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">Connect</p>
                  <FooterItem title="hi@store.gg" item1="team@store.gg" item2="Pasific 12, Jakarta Selatan" item3="0211-122-940" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
