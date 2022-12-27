import registerStyles from './register.module.css';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/actions/authActions';

const Register = () => {

  const [userData, setUserData] = React.useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { authDataReceived } = useSelector((store) => store.user);

  const onChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegistration = () => {
    dispatch(register(userData));
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
    <section className={registerStyles.container}>
      <h2 className={registerStyles.title}>Регистрация</h2>
      {
        !authDataReceived
          ? (
            <form className={registerStyles.form}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                value={userData.name}
                name={'name'}
                size={'default'}
                extraClass="ml-1"
              />
              <EmailInput
                onChange={onChange}
                value={userData.email}
                name={'email'}
                isIcon={false}
              />
              <PasswordInput
                onChange={onChange}
                value={userData.password}
                name={'password'}
                extraClass="mb-2"
              />
              <Button htmlType="button" type="primary" size="medium" onClick={handleRegistration}>
                Зарегистрироваться
              </Button>
            </form>
          )
          : <Redirect
            to={{
              pathname: '/'
            }}
          />
      }

      <p className={registerStyles.info}>Уже зарегистрированы?<Link className={registerStyles.link} to='/login'>Войти</Link></p>
    </section>
  )
}

export default Register;