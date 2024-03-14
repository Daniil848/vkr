import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserResults } from '../../app/usersSlice';
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
  }, []);

  const averageGrade = (sectionId: string) => {
    const arr = usersState.results
      .filter((item) => item.sectionId?.toString() === sectionId)
      .map((el) => el.percentCorrectAnswers); // массив чисел для вычисления

    const average = arr.reduce((acc, number) => acc + number, 0) / arr.length; // вычисление среднего арифметического

    return average;
  };

  return {
    usersState,
    articlesState,
    averageGrade,
    userCookie,
  };
};
