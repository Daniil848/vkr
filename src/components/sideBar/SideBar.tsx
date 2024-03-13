import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import { getAllArticles, getAllSections } from '../../app/articlesSlice';

const SideBar = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllSections());
  }, []);

  return (
    <>
      <aside className={styles.sideBar}>
        {articlesState.sections.map((section) => (
          <div key={section.id}>
            <p className={styles.sideBarSection}>{section.name}</p>
            <ul className={styles.sideBarList}>
              {articlesState.articles
                .filter((article) => article.sectionId.toString() == section.id)
                .map((article) => (
                  <li key={article.id} className={styles.sideBarListItem}>
                    <Link to={`/article/${article.id}`}>{article.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </aside>
    </>
  );
};

export default SideBar;
