import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  autorize,
  closeRegistrtionModal,
  registration,
} from '../../app/usersSlice';

export const useRegistration = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userDb = {
    id: '',
    userName: userName,
    email: email,
    password: password,
  };

  const getUserDb = {
    userName: userName,
    password: password,
  };

  const handleClose = () => {
    dispatch(closeRegistrtionModal());
  };

  const handleRegistation = () => {
    if (usersState.logIn) {
      dispatch(registration(userDb));
    } else if (usersState.signIn) {
      dispatch(autorize(getUserDb));
    }
  };

  return {
    usersState,
    setUserName,
    setEmail,
    setPassword,
    handleClose,
    userDb,
    handleRegistation,
  };
};
