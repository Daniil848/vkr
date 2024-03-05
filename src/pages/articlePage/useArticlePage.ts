import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { getSingleArticle, getTest } from '../../app/mainSlice';

export const useArticlePage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const { articleID } = useParams();

  useEffect(() => {
    const id = Number(articleID);
    dispatch(getSingleArticle(id));
    dispatch(getTest(id));
  }, [articleID]);

  return {
    state,
  };
};
