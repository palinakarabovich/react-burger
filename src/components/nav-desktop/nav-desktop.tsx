import appHeaderStyles from './nav-desktop.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../nav-item/nav-item';
import React from 'react';
import { Link } from 'react-router-dom';
import { INavProps } from '../../types';

const NavDesktop: React.FC<INavProps> = ({ location }) => {

  return (
    <div className={appHeaderStyles.container}>
      <nav className={appHeaderStyles.nav}>
        <Link to='/react-burger' className={appHeaderStyles.link}><NavItem Icon={BurgerIcon} description='Constructor' active={location.constructor} /></Link>
        <Link to='/react-burger/feed' className={appHeaderStyles.link}><NavItem Icon={ListIcon} description='Order feed' active={location.orders} /></Link>
      </nav>
      <Link to='/react-burger' className={appHeaderStyles.logo}>
        <Logo />
      </Link>
      <Link to='/react-burger/profile' className={appHeaderStyles.link}><NavItem Icon={ProfileIcon} description='Profile' active={location.profile} /></Link>
    </div>
  )
}

export default NavDesktop;