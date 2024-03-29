import forgetPasswordStyles from './forgot-password.module.css';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getNewPassword } from '../../services/actions/authActions';
import { useHistory } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../services';

const ForgotPassword = () => {

  const [userData, setUserData] = React.useState<{ email: string }>({ email: '' });
  const dispatch = useTypedDispatch();
  const { requestResetPasswordSuccess } = useTypedSelector((store) => store.resetPassword);
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getNewPassword(userData));
  }

  if (requestResetPasswordSuccess) {
    const _location = {
      pathname: `/react-burger/reset-password`,
      state: { requested: true }
    }
    history.push(_location);
  }

  return (
    <section className={forgetPasswordStyles.container}>
      <h2 className={forgetPasswordStyles.title}>Forgot your password?</h2>
      <form className={forgetPasswordStyles.form} onSubmit={handleForgotPassword}>
        < EmailInput
          onChange={onChange}
          value={userData.email}
          name={'email'}
          isIcon={false}
          placeholder={'Email'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Reset
        </Button>
      </form>
      <p className={forgetPasswordStyles.info}>Remember the password?<Link className={forgetPasswordStyles.link} to='/react-burger/login'>Login</Link></p>
    </section>
  )
}

export default ForgotPassword;