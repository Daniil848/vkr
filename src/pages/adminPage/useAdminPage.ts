import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResults,
  getAllUsers,
  getSingleUser,
  setAdminPageError,
} from '../../app/usersSlice';
import { getAllSections, getAllTests } from '../../app/articlesSlice';
import Cookies from 'js-cookie';

export const useAdminPage = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const adminId = Cookies.get('userId');

  useEffect(() => {
    if (adminId) {
      dispatch(getSingleUser(adminId)).then(() => {
        if (usersState.user?.admin === true) {
          dispatch(setAdminPageError(false));
          dispatch(getAllUsers());
          dispatch(getAllResults());
          dispatch(getAllSections());
          dispatch(getAllTests());
        } else {
          dispatch(setAdminPageError(true));
        }
      });
    }
  }, [adminId]);

  const averageGrade = (sectionId: string, userId: string) => {
    const arr = usersState.results
      .filter(
        (item) =>
          item.sectionId?.toString() === sectionId && item.userId === userId,
      )
      .map((el) => el.percentCorrectAnswers); // массив чисел для вычисления

    const average = arr.reduce((acc, number) => acc + number, 0) / arr.length; // вычисление среднего арифметического

    return average;
  };

  return {
    usersState,
    articlesState,
    averageGrade,
  };
};
