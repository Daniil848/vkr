import React from 'react';
import { useAdminPage } from './useAdminPage';
import styles from './AdminPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import TestResult from '../../components/testResult/TestResult';

const AdminPage = () => {
  const { usersState, articlesState, accordion, handleAccordion, adminId } =
    useAdminPage();
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
                {usersState.users
                  .filter((el) => el.id !== usersState.user?.id)
                  .map((user) => (
                    <div key={user.id}>
                      <div
                        className={styles.resultsUser}
                        onClick={() => handleAccordion(user)}
                      >
                        <p className={styles.resultsUserName}>
                          {user.userName}
                        </p>
                        <FontAwesomeIcon
                          icon={accordion[user.id] ? faCaretUp : faCaretDown}
                        />
                      </div>
                      <div
                        className={`${accordion[user.id] ? styles.accordion : styles.accordionClose}`}
                      >
                        <TestResult userId={user.id} />
                      </div>
                    </div>
                  ))}
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
