import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { closeRegistrtionModal, registration } from '../../app/usersSlice';

export const useRegistration = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userDb = {
    id: 0,
    email: userName,
    userName: email,
    password: password,
  };

  const handleClose = () => {
    dispatch(closeRegistrtionModal());
  };

  const handleRegistation = () => {
    dispatch(registration(userDb));
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
