import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import {
  clearArticleState,
  getSingleArticle,
  // getTestByArticleId,
} from '../../app/mainSlice';

export const useArticlePage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const { articleID } = useParams();

  useEffect(() => {
    if (articleID) {
      dispatch(getSingleArticle(articleID));
      // dispatch(getTestByArticleId(articleID));
    }
  }, [dispatch, articleID]);

  useEffect(() => {
    return () => {
      dispatch(clearArticleState());
    };
  }, []);

  return {
    state,
  };
};
