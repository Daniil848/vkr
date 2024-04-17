import React from 'react';
import { useProfilePage } from './useProfilePage';
import styles from './ProfilePage.module.scss';
import TestResult from '../../components/testsResults/TestsResults';
import Button from '../../UI/button/Button';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { usersState, articlesState, userCookie, handleLogOut } =
    useProfilePage();

  return (
    <>
      {!usersState.loading && !articlesState.loading && userCookie && (
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <div className={styles.userData}>
              <p className={styles.userName}>{usersState.user?.userName}</p>
              <p className={styles.userEmail}>{usersState.user?.email}</p>
            </div>
            <Link to={'/'} onClick={() => handleLogOut()}>
              <Button text="Выйти из учетой записи" />
            </Link>
          </div>
          <div className={styles.content}>
            <p className={styles.title}>Результаты пройденных тестов</p>
            <div className={styles.results}>
              <TestResult userId={usersState.user?.id} />
            </div>
          </div>
        </div>
      )}
      {!userCookie && (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>Ошибка!</p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
