import React from 'react';
import NavDesktop from '../nav-desktop/nav-desktop';
import NavMobile from '../nav-mobile/nav-mobile';
import { Link, useLocation } from 'react-router-dom';
import { INav } from '../../types';
import headerStyles from './app-header.module.css'
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import logo from '../../images/logo-mobile.svg'

const AppHeader: React.FunctionComponent = () => {

  const [nav, setNav] = React.useState<INav>({ constructor: false, orders: false, profile: false });
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === '/react-burger') {
      setNav({ constructor: true, orders: false, profile: false })
    } else if (pathname.includes('/react-burger/profile')) {
      setNav({ constructor: false, orders: false, profile: true })
      if (pathname.includes('/react-burger/profile/orders')) {
        setNav({ constructor: false, orders: false, profile: true, ordersHistory: true })
      } else setNav({ constructor: false, orders: false, profile: true, ordersHistory: false })
    } else if (pathname === '/react-burger/feed') {
      setNav({ constructor: false, orders: true, profile: false })
    } else {
      setNav(({ constructor: false, orders: false, profile: false }));
    }
  }, [pathname])

  const handleMenuClick = () => {
    setMenuOpen(true);
  }

  return (
    <header className={headerStyles.header}>
      <NavDesktop location={nav} />

      <div className={headerStyles.container}>
        <Link to='/react-burger' className={headerStyles.icon_logo}>
          <img src={logo} alt='logo' />
        </Link>
        <div className={headerStyles.icon_menu} onClick={handleMenuClick}>
        <MenuIcon type="primary" />
        </div>
      </div>

      <NavMobile location={nav} menu={isMenuOpen} setMenu={setMenuOpen}/>
    </header>
  )
}

export default AppHeader;