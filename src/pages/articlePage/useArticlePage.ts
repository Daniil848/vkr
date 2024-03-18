import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import {
  clearArticleState,
  getSingleArticle,
  resetStateTest,
} from '../../app/articlesSlice';
import { resetStateTestResult } from '../../app/usersSlice';

export const useArticlePage = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const { articleID } = useParams();

  useEffect(() => {
    dispatch(clearArticleState());
    dispatch(resetStateTest());
    dispatch(resetStateTestResult());
    if (articleID) {
      dispatch(getSingleArticle(articleID));
    }
  }, [dispatch, articleID]);

  useEffect(() => {
    return () => {
      dispatch(clearArticleState());
      dispatch(resetStateTest());
      dispatch(resetStateTestResult());
    };
  }, []);

  return {
    articlesState,
  };
};
