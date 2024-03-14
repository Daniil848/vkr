import React from 'react';
import { useProfilePage } from './useProfilePage';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const { usersState, articlesState, averageGrade } = useProfilePage();

  return (
    <>
      {!usersState.loading && !articlesState.loading && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>Результаты пройденных тестов</h1>
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
                    <div key={section.id}>
                      <p
                        className={styles.resultsSection}
                      >{`${section.name} - Средний балл : ${averageGrade(section.id)}`}</p>
                      {testsWithResults.map((test) => (
                        <ul key={test.id} className={styles.resultGrades}>
                          <li>{test.title}:</li>
                          {usersState.results
                            .filter((result) => result.testId === test.id)
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
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
