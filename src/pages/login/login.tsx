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
      <h2 className={loginStyles.title}>Login</h2>
      <form className={loginStyles.form} onSubmit={handleLogin}>
        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={'email'}
          isIcon={false}
          placeholder={'Email'}
        />
        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={'password'}
          extraClass="mb-2"
          placeholder={'Password'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Login
        </Button>
      </form>
      <p className={loginStyles.info}>New user?<Link className={loginStyles.link} to='/react-burger/register'>Register</Link></p>
      <p className={loginStyles.info}>Forget the password?<Link className={loginStyles.link} to='/react-burger/forgot-password'>Reset password</Link></p>
    </section>
  )
}

export default Login;