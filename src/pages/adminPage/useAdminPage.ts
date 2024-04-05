import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResults,
  getAllUsers,
  getSingleUser,
  setIsAdminPage,
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
      dispatch(setIsAdminPage(true));
    }
  }, [usersState.user?.admin, dispatch]);

  const handleAccordion = (user: User) => {
    setAccordion((prevState: any) => ({
      ...prevState,
      [user.id]: !prevState[user.id] || false,
    }));
  };

  return {
    usersState,
    articlesState,
    accordion,
    handleAccordion,
    adminId,
  };
};
