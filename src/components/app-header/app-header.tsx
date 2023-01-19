import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../nav-item/nav-item';
import React from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

interface INav {
  constructor: boolean;
  orders: boolean;
  profile: boolean;
}

const AppHeader: React.FunctionComponent = () => {

  const [nav, setNav] = React.useState<INav>({ constructor: false, orders: false, profile: false });
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === '/') {
      setNav({ constructor: true, orders: false, profile: false })
    } else if (pathname.includes('/profile')) {
      setNav({ constructor: false, orders: false, profile: true })
    } else if (pathname === '/order-feed') {
      setNav({ constructor: false, orders: true, profile: false })
    } else {
      setNav(({ constructor: false, orders: false, profile: false }));
    }
  }, [pathname])

  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.container}>
        <nav className={appHeaderStyles.nav}>
          <Link to='/' className={appHeaderStyles.link}><NavItem Icon={BurgerIcon} description='Конструктор' active={nav.constructor} /></Link>
          <Link to='/order-feed' className={appHeaderStyles.link}><NavItem Icon={ListIcon} description='Лента заказов' active={nav.orders} /></Link>
        </nav>
        <Link to='/' className={appHeaderStyles.logo}>
          <Logo />
        </Link>
        <Link to='/profile' className={appHeaderStyles.link}><NavItem Icon={ProfileIcon} description='Личный кабинет' active={nav.profile} /></Link>
      </div>
    </header >
  )
}

export default AppHeader;