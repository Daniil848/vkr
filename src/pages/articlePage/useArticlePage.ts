import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import {
  clearArticleState,
  getSingleArticle,
  getTestByArticleId,
} from '../../app/mainSlice';

export const useArticlePage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const { articleID } = useParams();

  useEffect(() => {
    const id = Number(articleID);
    dispatch(getSingleArticle(id));
    dispatch(getTestByArticleId(id));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearArticleState());
    };
  }, []);

  return {
    state,
  };
};
