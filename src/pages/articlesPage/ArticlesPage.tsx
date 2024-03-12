import React from 'react';
import { useArticlesPage } from './useArticlesPage';
import { Link } from 'react-router-dom';
import styles from './Articles.page.module.scss';
import Input from '../../UI/input/Input';

const ArticlesPage = () => {
  const { state, handleSearchChange } = useArticlesPage();

  if (!state.articles || !state.sections) return null;

  return (
    <>
      <div className={styles.wrapper}>
        <Input placeholder="Найти..." onChange={(e) => handleSearchChange(e)} />
        {!state.searchArticles
          ? !state.loading &&
            state.sections.map((section) => (
              <div key={section.id}>
                <h1 className={styles.section}>{section.name}</h1>
                {state.articles
                  .filter(
                    (article) => article.sectionId.toString() == section.id,
                  )
                  .map((article) => (
                    <div key={article.id}>
                      <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </div>
                  ))}
              </div>
            ))
          : state.articles.map((article) => (
              <div key={article.id}>
                <Link to={`/articles/article/${article.id}`}>
                  {article.title}
                </Link>
              </div>
            ))}
      </div>
    </>
  );
};

export default ArticlesPage;
