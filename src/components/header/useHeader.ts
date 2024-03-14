import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getSingleUser, openLogIn, openSignIn } from '../../app/usersSlice';
import Cookies from 'js-cookie';

export const useHeader = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
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

  return { usersState, handleOpenLogIn, handleOpenSignIn, cookie };
};
