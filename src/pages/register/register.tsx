import registerStyles from './register.module.css';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/authActions';
import { useTypedDispatch, useTypedSelector } from '../../services';

const Register = () => {

  const [userData, setUserData] = React.useState<{ name: string; email: string; password: string }>({ name: '', email: '', password: '' });
  const dispatch = useTypedDispatch();
  const { userSuccess } = useTypedSelector((store) => store.user);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(userData));
  }

  return (
    <section className={registerStyles.container}>
      <h2 className={registerStyles.title}>Registration</h2>
      {
        !userSuccess
          ? (
            <form className={registerStyles.form} onSubmit={handleRegistration}>
              <Input
                type={'text'}
                placeholder={'Name'}
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
                Register
              </Button>
            </form>
          )
          : <Redirect
            to={{
              pathname: '/'
            }}
          />
      }

      <p className={registerStyles.info}>Have an account?<Link className={registerStyles.link} to='/react-burger/login'>Login</Link></p>
    </section>
  )
}

export default Register;