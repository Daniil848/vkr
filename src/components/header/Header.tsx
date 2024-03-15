import React from 'react';
import { useHeader } from './useHeader';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faCircleInfo,
  faCircleUser,
  faHome,
  faNewspaper,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const {
    handleOpenLogIn,
    handleOpenSignIn,
    handleLogOut,
    cookie,
    usersState,
  } = useHeader();

  return (
    <>
      <nav>
        <div className={styles.header}>
          <div className={`${styles.headerMenu}`}>
            <a className={styles.headerTitle}></a>
            <ul className={`${styles.headerMenuList}`}>
              <li className={styles.headerMenuListItem}>
                <FontAwesomeIcon
                  icon={faHome}
                  className={styles.headerMenuListItemIcon}
                />
                <Link to={'/'} className={styles.headerMenuListItemLink}>
                  На главную
                </Link>
              </li>
              <li className={styles.headerMenuListItem}>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className={styles.headerMenuListItemIcon}
                />
                <Link
                  to={'/articles'}
                  className={styles.headerMenuListItemLink}
                >
                  Статьи
                </Link>
              </li>
              <li className={styles.headerMenuListItem}>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className={styles.headerMenuListItemIcon}
                />
                <Link to={'/about'} className={styles.headerMenuListItemLink}>
                  Инфо
                </Link>
              </li>
            </ul>
            <div className={styles.headerRegistration}>
              {!cookie && (
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
              {cookie && (
                <div className={styles.container}>
                  {' '}
                  <Link
                    to={'/profile'}
                    className={styles.headerRegistrationProfile}
                  >
                    <p className={styles.headerRegistrationProfileUser}>
                      {usersState.user?.userName}
                    </p>
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className={styles.headerRegistrationProfileIcon}
                    />
                  </Link>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className={styles.headerRegistrationLogOut}
                    title="Выйти из учетной записи"
                    onClick={() => handleLogOut()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
