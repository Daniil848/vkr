import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllResults } from '../../app/usersSlice';
import { getAllSections, getAllTests } from '../../app/articlesSlice';
import Cookies from 'js-cookie';

export const useProfilePage = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const userId = Cookies.get('userId');

  useEffect(() => {
    if (userId) dispatch(getAllResults(userId));
    dispatch(getAllSections());
    dispatch(getAllTests());
  }, []);

  const percent = (grade: number, count: number) => {
    return (grade / count) * 100;
  };

  return {
    usersState,
    articlesState,
    percent,
  };
};
