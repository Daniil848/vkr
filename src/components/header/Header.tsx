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
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const {
    handleOpenLogIn,
    handleOpenSignIn,
    handleLogOut,
    cookie,
    isOpenMenu,
    setOpenMenu,
    usersState,
  } = useHeader();

  return (
    <>
      <nav>
        <div className={styles.header}>
          <div className={styles.headerMenu}>
            <a className={styles.headerTitle}></a>
            <ul className={styles.headerMenuList}>
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
                <div
                  className={styles.headerProfile}
                  onClick={() => setOpenMenu(!isOpenMenu)}
                >
                  <span className={styles.headerProfileName}>
                    {usersState.user?.userName}
                  </span>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className={styles.headerProfileIcon}
                  />

                  {isOpenMenu && (
                    <div className={styles.headerProfileDropMenu}>
                      <Link
                        to={'/profile'}
                        className={styles.headerProfileDropMenuItem}
                      >
                        <span>Профиль</span>
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.headerProfileDropMenuIcon}
                          title="Выйти из учетной записи"
                        />
                      </Link>
                      <div
                        className={styles.headerProfileDropMenuItem}
                        onClick={() => handleLogOut()}
                      >
                        <span>Выход</span>
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className={styles.headerProfileDropMenuLogOutIcon}
                          title="Выйти из учетной записи"
                        />
                      </div>
                    </div>
                  )}
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
