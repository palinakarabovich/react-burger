import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import profileStyles from './profile.module.css';
import { logout } from '../../services/actions/authActions';
import UserInfo from '../../components/user-info/user-info';
import PropTypes from 'prop-types';

const Profile = ({ type }) => {

  const { userSuccess } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <section className={profileStyles.container}>
      <div className={profileStyles.nav}>
        <NavLink to='/profile' className={profileStyles.link} activeClassName={profileStyles.linkActive}>Профиль</NavLink>
        <NavLink to='/orders' className={profileStyles.link} activeClassName={profileStyles.linkActive}>История заказов</NavLink>
        <NavLink exact to='/' className={profileStyles.link} activeClassName={profileStyles.linkActive} onClick={() => dispatch(logout())}>Выход</NavLink>
      </div>
      <div className={profileStyles.content}>
        {
          !userSuccess
            ? <Loader />
            : type === 'user'
              ? <UserInfo />
              : <>тут будут заказы</>
        }
      </div>
    </section>
  )
}

export default Profile;

Profile.propTypes = {
  type: PropTypes.string,
}