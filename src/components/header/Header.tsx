import React from 'react';
import { useHeader } from './useHeader';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const { state } = useHeader();

  return (
    <>
      <nav>
        <div className={styles.header}>
          <div
            className={`${styles.headerMenu}  ${!state.articlesPage ? styles.menuWithoutSearch : ''}`}
          >
            <a className={styles.headerTitle}>
              <span className={styles.headerTitleText}>VKR</span>
            </a>
            <ul
              className={`${styles.headerMenuList} ${state.articlesPage ? styles.visibleSearch : styles.invisibleSearch}`}
            >
              <li className={styles.headerMenuListItem}>
                <Link to={''} className={styles.headerMenuListItemLink}>
                  На главную
                </Link>
              </li>
              <li className={styles.headerMenuListItem}>
                <Link
                  to={'/articles'}
                  className={styles.headerMenuListItemLink}
                >
                  Статьи
                </Link>
              </li>
              <li className={styles.headerMenuListItem}>
                <Link to={'/about'} className={styles.headerMenuListItemLink}>
                  Инфо
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
