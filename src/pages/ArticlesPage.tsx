import React from 'react';
import { useEffect } from 'react';
import { getAllArticles } from '../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const ArticlesPage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch, state.articles]);

  return <></>;
};

export default ArticlesPage;
