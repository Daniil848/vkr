import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { getSingleArticle } from '../app/mainSlice';

const ArticlePage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const articleId = useParams();

  useEffect(() => {
    const articleID = Number(articleId);

    dispatch(getSingleArticle(articleID));
  }, [dispatch, state.article]);

  return <></>;
};

export default ArticlePage;
