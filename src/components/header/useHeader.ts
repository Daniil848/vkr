import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSearchArticles,
  searchArticles,
  setSearchArticles,
} from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(searchArticles(search));
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (search) {
      dispatch(setSearchArticles());
    } else {
      dispatch(clearSearchArticles());
    }
  };

  return { state, setSearch, handleSearchChange };
};
