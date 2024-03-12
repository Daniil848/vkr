import React from 'react';
import { useArticlePage } from './useArticlePage';
import Test from '../../components/testComponent/Test';
import SideBar from '../../components/sideBar/SideBar';
import HTMLReactParser from 'html-react-parser';
import styles from './ArticlePage.module.scss';

const ArticlePage = () => {
  const { articlesState } = useArticlePage();

  if (!articlesState.article) return null;
  return (
    <>
      <SideBar />
      {!articlesState.loading && (
        <div className={styles.wrapper}>
          <article>
            <h1>{articlesState.article.title}</h1>
            {HTMLReactParser(articlesState.article.text)}
          </article>
        </div>
      )}
      <Test />
    </>
  );
};

export default ArticlePage;
