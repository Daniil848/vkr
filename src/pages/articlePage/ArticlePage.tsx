import React from 'react';
import { useArticlePage } from './useArticlePage';
import Test from '../../components/testComponent/Test';
import SideBar from '../../components/sideBar/SideBar';
import HTMLReactParser from 'html-react-parser';
import styles from './ArticlePage.module.scss';

const ArticlePage = () => {
  const { state } = useArticlePage();

  if (!state.article) return null;
  return (
    <>
      <SideBar />
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
