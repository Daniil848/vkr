import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResults,
  getAllUsers,
  setIsAdminPage,
} from '../../app/usersSlice';
import { getAllSections, getAllTests } from '../../app/articlesSlice';
import Cookies from 'js-cookie';

export const useAdminPage = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const adminId = Cookies.get('userId');

  useEffect(() => {
    if (usersState.user?.admin === true) {
      dispatch(getAllUsers());
      dispatch(getAllResults());
      dispatch(getAllSections());
      dispatch(getAllTests());
      dispatch(setIsAdminPage(true));
    }
  }, [usersState.user?.admin, dispatch]);

  return {
    usersState,
    articlesState,
    adminId,
  };
};
