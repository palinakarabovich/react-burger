import { ArrowDownIcon, ArrowUpIcon, BurgerIcon, CloseIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import navStyles from './nav-mobile.module.css'
import { Link } from 'react-router-dom';
import NavItem from '../nav-item/nav-item';
import { INavProps } from '../../types';
import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../services';
import { logout } from '../../services/actions/authActions';


const NavMobile: React.FC<INavProps> = ({ location, menu, setMenu }) => {

  const [isProfileClicked, setProfileClicked] = React.useState(false);
  const dispatch = useTypedDispatch();
  const { userSuccess } = useTypedSelector((store) => store.user);

  const handleSignOut = () => {
    dispatch(logout());
  }

  return (
    <>
      {
        menu && setMenu && (
          <div className={navStyles.container}>
            <div className={navStyles.icon_close} onClick={() => setMenu(false)}>
              <CloseIcon type='primary' />
              </div>
            <h2 className={navStyles.title}>Menu</h2>
            <nav className={navStyles.navigation}>
              <p className={navStyles.profile} onClick={() => setProfileClicked(!isProfileClicked)}>
                <NavItem Icon={ProfileIcon} description='Profile' active={location.profile} />
                <div className={navStyles.icon__arrow}>
                  {
                    isProfileClicked ? <ArrowUpIcon type='primary' /> : <ArrowDownIcon type={location.profile ? 'primary' : 'secondary'} />
                  }
                </div>
              </p>
              {
                isProfileClicked && (
                  <div className={navStyles.profile_list}>
                    <Link to='/react-burger/profile' className={navStyles.link} onClick={() => setMenu(false)}><NavItem description='Personal Information' active={!location.ordersHistory} /></Link>
                    <Link to='/react-burger/profile/orders' className={navStyles.link} onClick={() => setMenu(false)}><NavItem description='Orders history' active={location.ordersHistory} /></Link>
                    {userSuccess && <Link to='/react-burger' className={navStyles.link_profile} onClick={handleSignOut}><NavItem description='Sign out' /></Link>}
                  </div>
                )
              }
              <Link to='/react-burger' className={navStyles.link} onClick={() => setMenu(false)}><NavItem Icon={BurgerIcon} description='Burger Constructor' active={location.constructor} /></Link>
              <Link to='/react-burger/feed' className={navStyles.link} onClick={() => setMenu(false)}><NavItem Icon={ListIcon} description='Order feed' active={location.orders} /></Link>
            </nav>
          </div>
        )
      }
    </>
  )
}

export default NavMobile;