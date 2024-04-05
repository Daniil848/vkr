import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserResults, logOut, setIsAdminPage } from '../../app/usersSlice';
import { getAllSections, getAllTests } from '../../app/articlesSlice';
import Cookies from 'js-cookie';

export const useProfilePage = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const userCookie = Cookies.get('userId');

  useEffect(() => {
    if (userCookie) dispatch(getUserResults(userCookie));
    dispatch(getAllSections());
    dispatch(getAllTests());
    dispatch(setIsAdminPage(false));
  }, []);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return {
    usersState,
    articlesState,
    userCookie,
    handleLogOut,
  };
};
