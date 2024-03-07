import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllArticles,
  getAllSections,
  hideSearchArticles,
  showSearchArticles,
} from '../../app/mainSlice';

export const useArticlesPage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllSections());
    dispatch(showSearchArticles());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(hideSearchArticles());
    };
  }, []);

  return {
    state,
  };
};
