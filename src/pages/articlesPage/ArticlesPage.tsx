import React from 'react';
import { useArticlesPage } from './useArticlesPage';
import { Link } from 'react-router-dom';
import styles from './Articles.page.module.scss';

const ArticlesPage = () => {
  const { state } = useArticlesPage();

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
