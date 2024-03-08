import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSearchArticles,
  getAllArticles,
  getAllSections,
  searchArticles,
  setSearchArticles,
} from '../../app/mainSlice';

export const useArticlesPage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllSections());
    if (search) {
      dispatch(searchArticles(search));
    }
  }, [search]);

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);

    if (e.target.value) {
      dispatch(setSearchArticles());
    } else if (e.target.value === '') {
      dispatch(clearSearchArticles());
    }
  };

  return {
    state,
    handleSearchChange,
  };
};
