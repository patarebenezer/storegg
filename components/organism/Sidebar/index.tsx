import Footer from './Footer';
import Profile from './Profile';
import MenuItem from './MenuItem';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
interface SidebarProps {
    activeMenu: 'overview' | 'transactions' | 'settings'
}
export default function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;
  const router = useRouter()
  
  const logOut = () => {
    Cookies.remove('token')
    router.push('/sign-in')
  }
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile/>
        <div className="menus">
          <MenuItem title="Overview" gambar="ic-menu-overview" active={activeMenu === 'overview'} href="/member" />
          <MenuItem title="Transaction" gambar="ic-menu-transaction" active={activeMenu === 'transactions'} href="/member/transaction" />
          <MenuItem title="Messages" gambar="ic-menu-message" href="/member" />
          <MenuItem title="Card" gambar="ic-menu-card" href="/member" />
          <MenuItem title="Rewards" gambar="ic-menu-rewards" href="/member" />
          <MenuItem title="Settings" gambar="ic-menu-settings" active={activeMenu === 'settings'} href="/member/edit-profile" />
          <MenuItem title="Logout" gambar="ic-menu-logout" onClick={logOut} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
