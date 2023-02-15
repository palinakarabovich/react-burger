import loginStyles from './login.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/authActions';
import { useTypedDispatch } from '../../services';

const Login = () => {

  const [userData, setUserData] = React.useState<{ email: string; password: string }>({ email: '', password: '' });
  const dispatch = useTypedDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(userData));
  }

  return (
    <section className={loginStyles.container}>
      <h2 className={loginStyles.title}>Вход</h2>
      <form className={loginStyles.form} onSubmit={handleLogin}>
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
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className={loginStyles.info}>Вы — новый пользователь?<Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link></p>
      <p className={loginStyles.info}>Забыли пароль?<Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link></p>
    </section>
  )
}

export default Login;