import React from 'react';
import { useRegistration } from './useRegistration';
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
import styles from './Registration.module.scss';

const Registration = () => {
  const { state, setUserName, setEmail, setPassword, handleClose, userDb } =
    useRegistration();
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
