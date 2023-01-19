import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, useRouteMatch } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import profileStyles from './profile.module.css';
import { logout } from '../../services/actions/authActions';
import UserInfo from '../../components/user-info/user-info';
import ProtectedRoute from '../../components/protected-route/protected-route';

const Profile = () => {

  const { userSuccess } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const { path } = useRouteMatch<{ path: string }>();

  const handleLogout = () => {
    //@ts-ignore
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
              <ProtectedRoute exact={true} path={`${path}`}>
                <UserInfo />
              </ProtectedRoute>
              <ProtectedRoute exact={true} path={`${path}/orders/`}>
                <>orders</>
              </ProtectedRoute>
            </Switch>
          </div>
      }

    </section>
  )
}

export default Profile;