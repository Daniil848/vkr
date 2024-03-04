import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav>
        <div className={styles.header}>
          <a className={styles.headerTitle}>
            <span className={styles.headerTitleText}>VKR</span>
          </a>
          <div className={styles.headerMenu}>
            <ul className={styles.headerMenuList}>
              <li className={styles.headerMenuListItem}>
                <Link to={''} className={styles.headerMenuListItemLink}>
                  Home
                </Link>
              </li>
              <li className={styles.headerMenuListItem}>
                <Link to={''} className={styles.headerMenuListItemLink}>
                  About
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
