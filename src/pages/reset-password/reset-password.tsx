import resetPasswordStyles from './reset-password.module.css';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/authActions';
import { useTypedDispatch, useTypedSelector } from '../../services';

interface ILocationType {
  requested?: boolean;
}

const ResetPassword = () => {

  const [userData, setUserData] = React.useState<{ password: string; token: string }>({ password: '', token: '' });
  const dispatch = useTypedDispatch();
  const { requestChangePasswordSuccess } = useTypedSelector((store: any) => store.resetPassword);
  const history = useHistory();
  const { state } = useLocation<ILocationType>();
  const passwordWasRequested = state?.requested;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <section className={resetPasswordStyles.container}>
      <h2 className={resetPasswordStyles.title}>Восстановление пароля</h2>
      <form className={resetPasswordStyles.form} onSubmit={handleResetPassword}>
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
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className={resetPasswordStyles.info}>Вспомнили пароль?<Link className={resetPasswordStyles.link} to='/login'>Войти</Link></p>
    </section>
  )
}

export default ResetPassword;