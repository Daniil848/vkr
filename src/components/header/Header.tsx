import React from 'react';
import { useHeader } from './useHeader';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const { state } = useHeader();

  console.log(state.search);

  return (
    <>
      <nav>
        <div className={styles.header}>
          <div
            className={`${styles.headerMenu}  ${!state.search ? styles.menuWithoutSearch : ''}`}
          >
            <a className={styles.headerTitle}>
              <span className={styles.headerTitleText}>VKR</span>
            </a>
            <ul
              className={`${styles.headerMenuList} ${state.search ? styles.visibleSearch : styles.invisibleSearch}`}
            >
              <li className={styles.headerMenuListItem}>
                <Link to={''} className={styles.headerMenuListItemLink}>
                  Home
                </Link>
              </li>
              <li className={styles.headerMenuListItem}>
                <Link
                  to={'/articles'}
                  className={styles.headerMenuListItemLink}
                >
                  Articles
                </Link>
              </li>
              <li className={styles.headerMenuListItem}>
                <Link to={'/about'} className={styles.headerMenuListItemLink}>
                  About
                </Link>
              </li>
            </ul>
            <div className={styles.headerSearch}>
              {state.search && (
                <input
                  type="search"
                  placeholder="Search..."
                  className={styles.headerSearchInput}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
