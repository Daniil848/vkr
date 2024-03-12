import React from 'react';
import { useHeader } from './useHeader';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const { state, handleOpenLogIn, handleOpenSignIn } = useHeader();

  return (
    <>
      <nav>
        <div className={styles.header}>
          <div className={`${styles.headerMenu}`}>
            <a className={styles.headerTitle}></a>
            <ul className={`${styles.headerMenuList}`}>
              <li className={styles.headerMenuListItem}>
                <Link to={'/'} className={styles.headerMenuListItemLink}>
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
            <div className={styles.headerRegistration}>
              <button
                className={styles.headerRegistrationButton}
                onClick={() => handleOpenSignIn()}
              >
                Войти
              </button>
              <button
                className={styles.headerRegistrationButton}
                onClick={() => handleOpenLogIn()}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
