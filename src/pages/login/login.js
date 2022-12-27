import loginStyles from './login.module.css';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/authActions';

const Login = () => {

  const [userData, setUserData] = React.useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { authDataReceived } = useSelector((store) => store.user);

  const onChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    dispatch(login(userData));
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
    <section className={loginStyles.container}>
      <h2 className={loginStyles.title}>Вход</h2>
      {
        !authDataReceived
          ? (
            <form className={loginStyles.form}>
              <EmailInput
                onChange={onChange}
                value={userData.email}
                name={'email'}
                isIcon={false}
                placeholder={'E-mail'}
              />
              <PasswordInput
                onChange={onChange}
                value={userData.password}
                name={'password'}
                extraClass="mb-2"
                placeholder={'Пароль'}
              />
              <Button htmlType="button" type="primary" size="medium" onClick={handleLogin}>
                Войти
              </Button>
            </form>
          )
          : <Redirect
            to={{
              pathname: '/'
            }}
          />
      }
      <p className={loginStyles.info}>Вы — новый пользователь?<Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link></p>
      <p className={loginStyles.info}>Забыли пароль?<Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link></p>
    </section>
  )
}

export default Login;