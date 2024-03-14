import React from 'react';
import { useProfilePage } from './useProfilePage';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const { usersState, articlesState, averageGrade, userCookie } =
    useProfilePage();

  return (
    <>
      {!usersState.loading && !articlesState.loading && userCookie && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <p className={styles.title}>Результаты пройденных тестов</p>
            <div className={styles.results}>
              {articlesState.sections.map((section) => {
                const testsInSection = articlesState.tests.filter(
                  (test) => test.sectionId.toString() === section.id,
                );
                const testsWithResults = testsInSection.filter((test) =>
                  usersState.results.some(
                    (result) => result.testId === test.id,
                  ),
                );

                if (testsWithResults.length > 0) {
                  return (
                    <div key={section.id} className={styles.resultsSection}>
                      <div className={styles.resultsSectionTitle}>
                        <p>{section.name}:</p>
                        <p>Средний балл: {averageGrade(section.id)}%</p>
                      </div>
                      {testsWithResults.map((test) => (
                        <ul key={test.id} className={styles.resultTest}>
                          <li>{test.title}:</li>
                          {usersState.results
                            .filter((result) => result.testId === test.id)
                            .map((result) => (
                              <li
                                key={result.id}
                                className={styles.resultGrade}
                              >
                                {result.grade}/{result.answersCount}
                                <div className={styles.dot}></div>
                                {result.percentCorrectAnswers}%
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
