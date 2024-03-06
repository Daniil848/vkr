import React from 'react';
import { useArticlesPage } from './useArticlesPage';
import { Link } from 'react-router-dom';
import styles from './Articles.page.module.scss';

const ArticlesPage = () => {
  const { state } = useArticlesPage();

  if (!state.articles || !state.sections) return null;
  return (
    <>
      {!state.loading && (
        <div className={styles.wrapper}>
          {state.sections.map((section) => (
            <div key={section.id}>
              <h1 className={styles.section}>{section.name}</h1>
              {state.articles
                .filter((article) => article.sectionId == section.id)
                .map((article) => (
                  <div key={article.id}>
                    <Link to={`/articles/article/${article.id}`}>
                      {article.title}
                    </Link>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ArticlesPage;
