import React from 'react';
import { useArticlePage } from './useArticlePage';
import HTMLReactParser from 'html-react-parser';
import styles from './ArticlePage.module.scss';
import Test from '../../components/testComponent/Test';

const ArticlePage = () => {
  const { state } = useArticlePage();

  if (!state.article) return null;
  return (
    <>
      {!state.loading && (
        <div className={styles.wrapper}>
          <article>
            <h1>{state.article.title}</h1>
            {HTMLReactParser(state.article.text)}
          </article>
        </div>
      )}
      <Test />
    </>
  );
};

export default ArticlePage;
