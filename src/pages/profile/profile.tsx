import { NavLink, Switch, useRouteMatch } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import profileStyles from './profile.module.css';
import { logout } from '../../services/actions/authActions';
import UserInfo from '../../components/user-info/user-info';
import ProtectedRoute from '../../components/protected-route/protected-route';
import PersonalOrdersInfo from '../../components/personal-orders-feed/personal-orders-feed';
import { useTypedDispatch, useTypedSelector } from '../../services';

const Profile = () => {

  const { userSuccess } = useTypedSelector((store) => store.user);
  const dispatch = useTypedDispatch();
  const { path } = useRouteMatch<{ path: string }>();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <section className={profileStyles.container}>
      <div className={profileStyles.nav}>
        <NavLink exact to={`${path}`} className={profileStyles.link} activeClassName={profileStyles.linkActive}>Профиль</NavLink>
        <NavLink exact to={`${path}/orders/`} className={profileStyles.link} activeClassName={profileStyles.linkActive}>История заказов</NavLink>
        <NavLink exact to='/' className={profileStyles.link} activeClassName={profileStyles.linkActive} onClick={handleLogout}>Выход</NavLink>
      </div>

      {
        !userSuccess
          ? <Loader />
          :
          <div className={profileStyles.content}>
            <Switch>
              <ProtectedRoute onlyForAuth exact={true} path={`${path}`}>
                <UserInfo />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth exact={true} path={`${path}/orders/`}>
                <PersonalOrdersInfo />
              </ProtectedRoute>
            </Switch>
          </div>
      }

    </section>
  )
}

export default Profile;