import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
import styles from './Registration.module.scss';
import { closeRegistrtionModal } from '../../app/mainSlice';

const Registration = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userDb = {
    id: 0,
    email: userName,
    username: email,
    password: password,
  };

  const handleClose = () => {
    dispatch(closeRegistrtionModal());
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.form}>
            <button className={styles.formClose} onClick={() => handleClose()}>
              x
            </button>
            <div className={styles.formTitles}>
              <p>{state.logIn ? 'Зарегистрироваться' : 'Войти'}</p>
            </div>
            {state.logIn && (
              <div className={styles.inputsWrapper}>
                <Input
                  type="text"
                  placeholder="User name"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            )}
            <div className={styles.inputsWrapper}>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputsWrapper}>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button text="OK" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
