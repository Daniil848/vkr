import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { closeRegistrtionModal } from '../../app/mainSlice';

export const useRegistration = () => {
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

  return {
    state,
    setUserName,
    setEmail,
    setPassword,
    handleClose,
    userDb,
  };
};
