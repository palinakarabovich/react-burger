import forgetPasswordStyles from './forgot-password.module.css';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPassword } from '../../services/actions/authActions';
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {

  const [userData, setUserData] = React.useState<{ email: string }>({ email: '' });
  const dispatch = useDispatch();
  const { requestResetPasswordSuccess } = useSelector((store: any) => store.resetPassword);
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
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
      <form className={forgetPasswordStyles.form} onSubmit={handleForgotPassword}>
        < EmailInput
          onChange={onChange}
          value={userData.email}
          name={'email'}
          isIcon={false}
          placeholder={'Укажите e-mail'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className={forgetPasswordStyles.info}>Вспомнили пароль?<Link className={forgetPasswordStyles.link} to='/login'>Войти</Link></p>
    </section>
  )
}

export default ForgotPassword;