import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <nav className={styles.container}>
        <div className={styles.header}>
          <a className={styles.headerTitle}>
            <span className={styles.headerTitleText}>VKR</span>
          </a>
          <div className={styles.headerMenu}>
            <ul className={styles.headerMenuList}>
              <li className={styles.headerMenuListItem}>Home</li>
              <li className={styles.headerMenuListItem}>Articles</li>
              <li className={styles.headerMenuListItem}>About</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
