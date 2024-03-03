import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { getSingleArticle, getTest } from '../app/mainSlice';
import HTMLReactParser from 'html-react-parser';
import styles from './ArticlePage.module.scss';
import Test from '../components/Test';

const ArticlePage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const { articleID } = useParams();

  useEffect(() => {
    const id = Number(articleID);
    dispatch(getSingleArticle(id));
    dispatch(getTest(id));
  }, [articleID]);

  if (!state.article) return null;
  return (
    <>
      <div className={styles.wrapper}>
        <article>
          <h2>{state.article.title}</h2>
          {HTMLReactParser(state.article.text)}
        </article>
        <Test />
      </div>
    </>
  );
};

export default ArticlePage;
