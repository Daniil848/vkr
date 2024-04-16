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
  faUserPlus,
  faUserTie,
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
              <div className={styles.container}>
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
                    Курсы
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
              </div>
            </ul>
            <div className={styles.headerRegistration}>
              {!cookie && (
                <>
                  <button
                    className={styles.headerRegistrationButton}
                    onClick={() => handleOpenSignIn()}
                  >
                    <p className={styles.headerRegistrationButtonText}>Войти</p>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className={styles.headerRegistrationButtonIcon}
                    />
                  </button>

                  <button
                    className={styles.headerRegistrationButton}
                    onClick={() => handleOpenLogIn()}
                  >
                    <p className={styles.headerRegistrationButtonText}>
                      Зарегистрироваться
                    </p>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className={styles.headerRegistrationButtonIcon}
                    />
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
                        />
                      </Link>
                      {usersState.user?.admin && (
                        <Link
                          to={'/admin'}
                          className={styles.headerProfileDropMenuItem}
                        >
                          <span>Администрирование</span>
                          <FontAwesomeIcon
                            icon={faUserTie}
                            className={styles.headerProfileDropMenuIcon}
                          />
                        </Link>
                      )}
                      <div
                        className={styles.headerProfileDropMenuItem}
                        onClick={() => handleLogOut()}
                      >
                        <span>Выйти из профиля</span>
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className={styles.headerProfileDropMenuLogOutIcon}
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
