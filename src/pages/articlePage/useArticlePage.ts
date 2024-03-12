import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { clearArticleState, getSingleArticle } from '../../app/articlesSlice';

export const useArticlePage = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const { articleID } = useParams();

  useEffect(() => {
    if (articleID) {
      dispatch(getSingleArticle(articleID));
    }
  }, [dispatch, articleID]);

  useEffect(() => {
    return () => {
      dispatch(clearArticleState());
    };
  }, []);

  return {
    articlesState,
  };
};
