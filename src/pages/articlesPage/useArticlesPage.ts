import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllArticles,
  getAllSections,
  hideSearch,
  showSearch,
} from '../../app/mainSlice';

export const useArticlesPage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllSections());
    dispatch(showSearch());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(hideSearch());
    };
  }, []);

  return {
    state,
  };
};
