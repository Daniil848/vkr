import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import { getAllArticles, getAllSections } from '../../app/mainSlice';

const SideBar = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllSections());
  }, []);

  return (
    <>
      <aside className={styles.sideBar}>
        {state.sections.map((section) => (
          <div key={section.id}>
            <p className={styles.sideBarSection}>{section.name}</p>
            <ul className={styles.sideBarList}>
              {state.articles
                .filter((article) => article.sectionId.toString() == section.id)
                .map((article) => (
                  <li key={article.id} className={styles.sideBarListItem}>
                    <Link to={`/articles/article/${article.id}`}>
                      {article.title}
                    </Link>
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
