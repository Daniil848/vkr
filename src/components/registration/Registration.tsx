import React, { useState } from 'react';
import styles from './Registration.module.scss';
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';

const Registration = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userDb = {
    id: 0,
    email: userName,
    username: email,
    password: password,
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.form}>
            <button
              className={styles.formClose}
              // onClick={() => handleClose()}
            ></button>
            {/* <div className={styles.formTitles}>
              <button
                className={styles.formTitle}
                onClick={() => handleSwitch()}
              >
                {state.logIn ? 'Log In' : 'Sign In'}
              </button>
            </div> */}
            {/* {state.signIn && (
              <div className={styles.inputsWrapper}>
                <input
                  type="text"
                  placeholder="User name"
                  onChange={(e) => setUserName(e.target.value)}
                  className={styles.input}
                />
              </div>
            )} */}
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
            {/* {state.signIn && ( */}
            <div className={styles.inputsWrapper}>
              <Input type="password" placeholder="Confirm Password" />
            </div>
            {/* )} */}
            <Button text="OK" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
