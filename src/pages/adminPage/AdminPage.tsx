import React from 'react';
import { useAdminPage } from './useAdminPage';
import styles from './AdminPage.module.scss';

const AdminPage = () => {
  const { usersState, articlesState, averageGrade } = useAdminPage();
  return (
    <>
      {!usersState.loading &&
        !articlesState.loading &&
        !usersState.adminPageError &&
        usersState.user?.admin && (
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <h1 className={styles.title}>Результаты пройденных тестов</h1>
              <div className={styles.results}>
                {usersState.users.map((user) => (
                  <div key={user.id}>
                    <h2>{`Результаты для пользователя ${user.userName}`}</h2>
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
                          <div key={section.id}>
                            <p
                              className={styles.resultsSection}
                            >{`${section.name} - Средний балл: ${averageGrade(section.id, user.id)}`}</p>
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
                                    <div key={result.id}>
                                      <li>
                                        {`${result.grade}/${result.answersCount} Правильных ответов - ${result.percentCorrectAnswers} Баллов`}
                                      </li>
                                    </div>
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
