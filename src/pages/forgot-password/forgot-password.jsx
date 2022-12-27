import forgetPasswordStyles from './forgot-password.module.css';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPassword } from '../../services/actions/authActions';
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {

  const [userData, setUserData] = React.useState({ email: '' });
  const dispatch = useDispatch();
  const { requestResetPasswordSuccess } = useSelector((store) => store.resetPassword);
  const history = useHistory();

  const onChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleForgotPassword = () => {
    dispatch(getNewPassword(userData));
  }

  if (requestResetPasswordSuccess) {
    const _location = {
      pathname: `/reset-password`,
      state: { requested: true }
    }
    history.push(_location);
  }

  if (localStorage.getItem('refreshToken')) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <section className={forgetPasswordStyles.container}>
      <h2 className={forgetPasswordStyles.title}>Восстановление пароля</h2>
      <form className={forgetPasswordStyles.form}>
        < EmailInput
          onChange={onChange}
          value={userData.email}
          name={'email'}
          isIcon={false}
          placeholder={'Укажите e-mail'}
        />
        <Button htmlType="button" type="primary" size="medium" onClick={handleForgotPassword}>
          Восстановить
        </Button>
      </form>
      <p className={forgetPasswordStyles.info}>Вспомнили пароль?<Link className={forgetPasswordStyles.link} to='/login'>Войти</Link></p>
    </section>
  )
}

export default ForgotPassword;