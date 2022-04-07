import { useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import AOS from 'aos';
import Navbar from '../components/organism/Navbar';
import MainBanner from '../components/organism/MainBanner';
import TransactionStep from '../components/organism/TransactionStep';
import FeaturedGame from '../components/organism/FeaturedGame';
import Reached from '../components/organism/Reached';
import Footer from '../components/organism/Footer';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Footer />
    </>
  );
}
