import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResults,
  getAllUsers,
  getSingleUser,
} from '../../app/usersSlice';
import { getAllSections, getAllTests } from '../../app/articlesSlice';
import Cookies from 'js-cookie';
import { User } from '../../app/usersTypes';

interface Accordion {
  [key: string]: boolean;
}

export const useAdminPage = () => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const [accordion, setAccordion] = useState<Accordion>({});

  const adminId = Cookies.get('userId');

  useEffect(() => {
    if (adminId) {
      dispatch(getSingleUser(adminId));
    }
  }, [adminId, dispatch]);

  useEffect(() => {
    if (usersState.user?.admin === true) {
      dispatch(getAllUsers());
      dispatch(getAllResults());
      dispatch(getAllSections());
      dispatch(getAllTests());
    }
  }, [usersState.user?.admin, dispatch]);

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

  const handleAccordion = (user: User) => {
    setAccordion((prevState: any) => ({
      ...prevState,
      [user.id]: !prevState[user.id] || false,
    }));
  };

  return {
    usersState,
    articlesState,
    averageGrade,
    accordion,
    handleAccordion,
    adminId,
  };
};
