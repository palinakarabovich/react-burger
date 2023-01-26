import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import userInfoStyles from './user-info.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/actions/authActions';

const UserInfo = () => {

  const { user } = useSelector((store) => store.user);
  const [form, setForm] = React.useState({ name: user.name, email: user.email, password: '' });
  const [inputsDisabled, setInputsDisabled] = React.useState({ name: true, email: true, password: true });
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const dispatch = useDispatch();

  const onIconClick = (input) => {
    setInputsDisabled(prev => ({ ...inputsDisabled, [input]: !prev[input] }));
    if (input === 'name') {
      setTimeout(() => nameRef.current.focus(), 0)
    } else if (input === 'email') {
      setTimeout(() => emailRef.current.focus(), 0)
    } else if (input === 'password') {
      setTimeout(() => passwordRef.current.focus(), 0)
    }
  }

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onClickCancel = () => {
    setForm({ name: user.name, email: user.email, password: '' });
    setInputsDisabled({ name: true, email: true, password: true });
  }

  const onClickSave = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
    setInputsDisabled({ name: true, email: true, password: true });
  }

  return (
    <form className={userInfoStyles.form} onSubmit={onClickSave}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        name='name'
        disabled={inputsDisabled.name}
        value={form.name}
        icon={inputsDisabled.name ? 'EditIcon' : 'CloseIcon'}
        onChange={onChange}
        onIconClick={() => onIconClick('name')}
        ref={nameRef}
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        name='email'
        disabled={inputsDisabled.email}
        value={form.email}
        icon={inputsDisabled.email ? 'EditIcon' : 'CloseIcon'}
        onChange={onChange}
        onIconClick={() => onIconClick('email')}
        ref={emailRef}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        icon={inputsDisabled.password ? 'EditIcon' : 'CloseIcon'}
        value={form.password}
        name={'password'}
        ref={passwordRef}
        onChange={onChange}
        disabled={inputsDisabled.password}
        onIconClick={() => onIconClick('password')}
      />
      {
        Object.values(inputsDisabled).some(input => !input)
        && (
          <div className={userInfoStyles.buttonsGroup}>
            <Button htmlType="button" type="secondary" size="medium" onClick={onClickCancel}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )
      }
    </form>
  )
}

export default UserInfo;