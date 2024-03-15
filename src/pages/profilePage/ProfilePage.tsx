import React from 'react';
import { useProfilePage } from './useProfilePage';
import styles from './ProfilePage.module.scss';
import TestResult from '../../components/testResult/TestResult';

const ProfilePage = () => {
  const { usersState, articlesState, userCookie } = useProfilePage();

  return (
    <>
      {!usersState.loading && !articlesState.loading && userCookie && (
        <div className={styles.wrapper}>
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
