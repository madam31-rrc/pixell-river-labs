import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;