import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import userInfoStyles from './user-info.module.css';
import React from 'react';
import { updateUser } from '../../services/actions/authActions';
import { useTypedDispatch, useTypedSelector } from '../../services';
import { IUser } from '../../types';

const UserInfo = () => {

  const { user } = useTypedSelector((store) => store.user);
  const [form, setForm] = React.useState<IUser>({ name: user?.name, email: user?.email, password: '' });
  const [inputsDisabled, setInputsDisabled] = React.useState<{ [name: string]: boolean; email: boolean; password: boolean }>({ name: true, email: true, password: true });
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const onIconClick = (input: string) => {
    setInputsDisabled(prev => ({ ...inputsDisabled, [input]: !prev[input] }));
    if (input === 'name') {
      setTimeout(() => {
        if (nameRef.current !== null)
          nameRef.current.focus()
      }, 0)
    } else if (input === 'email') {
      setTimeout(() => {
        if (emailRef.current !== null)
          emailRef.current.focus()
      }, 0)
    } else if (input === 'password') {
      setTimeout(() => {
        if (passwordRef.current !== null)
          passwordRef.current.focus()
      }, 0)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onClickCancel = () => {
    setForm({ name: user?.name, email: user?.email, password: '' });
    setInputsDisabled({ name: true, email: true, password: true });
  }

  const onClickSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(form));
    setInputsDisabled({ name: true, email: true, password: true });
  }

  return (
    <form className={userInfoStyles.form} onSubmit={onClickSave}>
      {
        form.name !== undefined && form.email !== undefined && form.password !== undefined && (
          <>
            <Input
              type={'text'}
              placeholder={'Name'}
              name='name'
              disabled={inputsDisabled.name}
              value={form.name}
              icon={inputsDisabled.name ? 'EditIcon' : 'CloseIcon'}
              onChange={onChange}
              onIconClick={() => onIconClick('name')}
              ref={nameRef} />
              
              <Input
              type={'email'}
              placeholder={'Email'}
              name='email'
              disabled={inputsDisabled.email}
              value={form.email}
              icon={inputsDisabled.email ? 'EditIcon' : 'CloseIcon'}
              onChange={onChange}
              onIconClick={() => onIconClick('email')}
              ref={emailRef} />
              
              <Input
              type={'password'}
              placeholder={'Password'}
              icon={inputsDisabled.password ? 'EditIcon' : 'CloseIcon'}
              value={form.password}
              name={'password'}
              ref={passwordRef}
              onChange={onChange}
              disabled={inputsDisabled.password}
              onIconClick={() => onIconClick('password')} />
              </>
        )
      }
      {
        Object.values(inputsDisabled).some(input => !input)
        && (
          <div className={userInfoStyles.buttonsGroup}>
            <Button htmlType="button" type="secondary" size="medium" onClick={onClickCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Save
            </Button>
          </div>
        )
      }
    </form>
  )
}

export default UserInfo;