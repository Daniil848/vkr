import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { getSingleArticle } from '../app/mainSlice';
import styles from './ArticlePage.module.scss';

const ArticlePage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const { articleID } = useParams();

  useEffect(() => {
    const id = Number(articleID);
    dispatch(getSingleArticle(id));
  }, [articleID]);

  if (state.article === null) return null;
  return (
    <>
      <div className={styles.wrapper}>
        <article>
          <h2>{state.article.title}</h2>
          {state.article.text}
        </article>
      </div>
    </>
  );
};

export default ArticlePage;
