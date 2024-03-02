import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllArticles } from '../app/mainSlice';
import { Link } from 'react-router-dom';
import styles from './Articles.page.module.scss';

const ArticlesPage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);
  console.log(state.articles);

  if (!state.articles) return null;
  return (
    <>
      <div className={styles.wrapper}>
        {state.articles.map((article) => (
          <div key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticlesPage;
