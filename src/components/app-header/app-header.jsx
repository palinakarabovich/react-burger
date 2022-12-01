import appHeaderStyles from './app-header.module.css';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../nav-item/nav-item';

const AppHeader = () => {

  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.container}>
        <nav className={appHeaderStyles.nav}>
          <NavItem Icon={BurgerIcon} description='Конструктор' active={true} />
          <NavItem Icon={ListIcon} description='Лента заказов' />
        </nav>
        <a className={appHeaderStyles.logo}>
          <Logo />
        </a>
        <NavItem Icon={ProfileIcon} description='Личный кабинет' />
      </div>
    </header >
  )
}

export default AppHeader;