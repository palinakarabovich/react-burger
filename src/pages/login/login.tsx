import loginStyles from './login.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/authActions';
import { useTypedDispatch } from '../../services';

const Login: React.FC = () => {

  const [userData, setUserData] = React.useState<{ email: string; password: string }>({ email: '', password: '' });
  const dispatch = useTypedDispatch();
  const [isIconClicked, setIconClicked] = React.useState<boolean>(false)

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

  const handleIconlick = () => {
    setIconClicked(!isIconClicked);
  }

  return (
    <section className={loginStyles.container}>
      <h2 className={loginStyles.title}>Login</h2>
      <p className={loginStyles.testing}>Testing data</p>
      <p className={loginStyles.testing}> Email: cat@cat.cat</p>
      <p className={loginStyles.testing}>Password: cat123</p>
      <form className={loginStyles.form} onSubmit={handleLogin}>
        <Input
          onChange={onChange}
          value={userData.email}
          name={'email'}
          placeholder={'Email'}
          type='email'
          extraClass={loginStyles.input_custom}
        />
          <Input
            type={isIconClicked ? 'text' : 'password'}
            onChange={onChange}
            value={userData.password}
            name={'password'}
            placeholder={'Password'}
            icon={isIconClicked ? 'HideIcon' : 'ShowIcon'}
            onIconClick={handleIconlick}
          />
        <Button htmlType="submit" type="primary" size="medium">
          Login
        </Button>
      </form>
      <p className={loginStyles.info}>New user?<Link className={loginStyles.link} to='/react-burger/register'>Register</Link></p>
      {/* <p className={loginStyles.info}>Forget the password?<Link className={loginStyles.link} to='/react-burger/forgot-password'>Reset password</Link></p> */}
    </section>
  )
}

export default Login;