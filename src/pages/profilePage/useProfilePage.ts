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

  const averageGrade = () => {
    const arr = usersState.results.map((el) => el.percentCorrectAnswers); // массив чисел для вычисления

    const average = arr.reduce((acc, number) => acc + number, 0) / arr.length; // вычисление среднего арифметического

    return average;
  };

  return {
    usersState,
    articlesState,
    averageGrade,
  };
};
