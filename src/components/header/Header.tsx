import React from 'react';
import { useHeader } from './useHeader';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { handleOpenLogIn, handleOpenSignIn, cookie } = useHeader();

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
              {Object.keys(cookie).length === 0 && (
                <>
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
                </>
              )}
              {Object.keys(cookie).length !== 0 && (
                <Link
                  to={'/profile'}
                  className={styles.headerRegistrationProfile}
                >
                  <p className={styles.headerRegistrationProfileUser}>
                    {cookie.userName}
                  </p>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className={styles.headerRegistrationProfileIcon}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
