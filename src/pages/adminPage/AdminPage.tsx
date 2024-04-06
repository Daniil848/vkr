import React from 'react';
import { useAdminPage } from './useAdminPage';
import styles from './AdminPage.module.scss';
import TestResult from '../../components/testResult/TestResult';

const AdminPage = () => {
  const { usersState, articlesState, adminId } = useAdminPage();

  return (
    <>
      {!usersState.loading &&
        !articlesState.loading &&
        !usersState.adminPageError &&
        usersState.user?.admin &&
        adminId && (
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <p className={styles.title}>Результаты пройденных тестов</p>
              <div className={styles.results}>
                <div>
                  <div>
                    <TestResult userId={usersState.user?.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {!usersState.user?.admin && (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>У вас нет доступа к этой странице!</p>
        </div>
      )}
    </>
  );
};

export default AdminPage;
