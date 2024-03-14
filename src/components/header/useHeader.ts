import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getSingleUser,
  logOut,
  openLogIn,
  openSignIn,
} from '../../app/usersSlice';
import Cookies from 'js-cookie';

export const useHeader = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();

  const cookie = Cookies.get('userId');

  useEffect(() => {
    if (cookie) dispatch(getSingleUser(cookie));
  }, []);

  const handleOpenSignIn = () => {
    dispatch(openSignIn());
  };

  const handleOpenLogIn = () => {
    dispatch(openLogIn());
  };
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return {
    usersState,
    handleOpenLogIn,
    handleOpenSignIn,
    handleLogOut,
    cookie,
  };
};
