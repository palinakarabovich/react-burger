import resetPasswordStyles from './reset-password.module.css';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/authActions';

const ResetPassword = () => {

  const [userData, setUserData] = React.useState({ password: '', token: '' });
  const dispatch = useDispatch();
  const { requestChangePasswordSuccess } = useSelector((store) => store.resetPassword);
  const history = useHistory();
  const location = useLocation();
  const passwordWasRequested = location.state?.requested;

  const onChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleResetPassword = () => {
    dispatch(resetPassword(userData));
  };

  if (!passwordWasRequested) {
    return <Redirect to='/forgot-password' />
  }

  if (requestChangePasswordSuccess) {
    history.replace({
      pathname: `/login`,
      state: null
    });
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
    <section className={resetPasswordStyles.container}>
      <h2 className={resetPasswordStyles.title}>Восстановление пароля</h2>
      <form className={resetPasswordStyles.form}>
        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={'password'}
          extraClass="mb-2"
          placeholder={'Введите новый пароль'} />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={userData.token}
          name={'token'} />
        <Button htmlType="button" type="primary" size="medium" onClick={handleResetPassword}>
          Сохранить
        </Button>
      </form>
      <p className={resetPasswordStyles.info}>Вспомнили пароль?<Link className={resetPasswordStyles.link} to='/login'>Войти</Link></p>
    </section>
  )
}

export default ResetPassword;