import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSearchArticles,
  getAllArticles,
  getAllSections,
  searchArticles,
  setSearchArticles,
} from '../../app/articlesSlice';

export const useArticlesPage = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(getAllSections());
    dispatch(getAllArticles());
    if (search) {
      dispatch(searchArticles(search));
    }
  }, [search]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(e.target.value);

    if (e.target.value) {
      dispatch(setSearchArticles());
    } else if (e.target.value === '') {
      dispatch(clearSearchArticles());
    }
  };

  return {
    articlesState,
    handleSearchChange,
  };
};
