import React from 'react';
import { useAdminPage } from './useAdminPage';
import styles from './AdminPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
  const {
    usersState,
    articlesState,
    averageGrade,
    accordion,
    handleAccordion,
    adminId,
  } = useAdminPage();
  return (
    <>
      {!usersState.loading &&
        !articlesState.loading &&
        !usersState.adminPageError &&
        usersState.user?.admin &&
        adminId && (
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <h1 className={styles.title}>Результаты пройденных тестов</h1>
              <div className={styles.results}>
                {usersState.users.map((user) => (
                  <div key={user.id}>
                    <div
                      className={styles.resultsUser}
                      onClick={() => handleAccordion(user)}
                    >
                      <p>{user.userName}</p>
                      <FontAwesomeIcon
                        icon={accordion[user.id] ? faCaretUp : faCaretDown}
                      />
                    </div>
                    {articlesState.sections.map((section) => {
                      const testsInSection = articlesState.tests.filter(
                        (test) => test.sectionId.toString() === section.id,
                      );
                      const testsWithResults = testsInSection.filter((test) =>
                        usersState.results.some(
                          (result) =>
                            result.testId === test.id &&
                            result.userId === user.id,
                        ),
                      );

                      if (testsWithResults.length > 0) {
                        return (
                          <div
                            key={section.id}
                            className={`${accordion[user.id] ? styles.accordion : styles.accordionClose}`}
                          >
                            <div className={styles.resultsSection}>
                              <p>{section.name}:</p>
                              <p>
                                Средний балл:{' '}
                                {averageGrade(section.id, user.id)}
                              </p>
                            </div>
                            {testsWithResults.map((test) => (
                              <ul key={test.id} className={styles.resultGrades}>
                                <li>{test.title}:</li>
                                {usersState.results
                                  .filter(
                                    (result) =>
                                      result.testId === test.id &&
                                      result.userId === user.id,
                                  )
                                  .map((result) => (
                                    <li
                                      key={result.id}
                                      className={styles.resultGrade}
                                    >
                                      {result.grade}/{result.answersCount}
                                      <div className={styles.dot}></div>
                                      {result.percentCorrectAnswers} Баллов
                                    </li>
                                  ))}
                              </ul>
                            ))}
                          </div>
                        );
                      }

                      return null;
                    })}
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
