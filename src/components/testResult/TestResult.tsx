import React from 'react';
import { useTestResult } from './useTestResult';
import styles from './TestResult.module.scss';

interface Props {
  userId: string | undefined;
}

const TestResult = (props: Partial<Props>) => {
  const { articlesState, usersState, averageGrade, averageTestGrade } =
    useTestResult(props);
  return (
    <>
      {articlesState.sections.map((section) => {
        const testsInSection = articlesState.tests.filter(
          (test) => test.sectionId.toString() === section.id,
        );
        const testsWithResults = testsInSection.filter((test) =>
          usersState.results.some((result) =>
            usersState.isAdminPage
              ? result.testId === test.id
              : result.testId === test.id && result.userId === props.userId,
          ),
        );
        console.log(testsWithResults);

        if (testsWithResults.length > 0) {
          return (
            <>
              <div key={section.id} className={styles.resultsSection}>
                <div className={styles.wrapper}>
                  <p className={styles.resultsSectionName}>{section.name}:</p>
                  {!usersState.isAdminPage && (
                    <div className={styles.resultsSectionGrade}>
                      <p>
                        Тестов решено:{' '}
                        {
                          testsWithResults.filter(
                            (test) => test.sectionId.toString() === section.id,
                          ).length
                        }
                        /{testsInSection.length}
                      </p>
                      <p>
                        Средний балл:{' '}
                        {props.userId &&
                          averageGrade(section.id, props.userId).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
                {testsWithResults.map((test) => (
                  <table key={test.id} className={styles.resultsTable}>
                    <caption className={styles.resultsTableCaption}>
                      Тест: {test.title}
                    </caption>
                    <thead className={styles.resultsTableHead}>
                      <tr className={styles.resultsTableRow}>
                        <th className={styles.resultsTableCell}>
                          Номер попытки
                        </th>
                        {usersState.isAdminPage && (
                          <th className={styles.resultsTableCell}>
                            Имя пользователя
                          </th>
                        )}
                        <th className={styles.resultsTableCell}>
                          Название курса
                        </th>
                        <th className={styles.resultsTableCell}>
                          Правильные ответы
                        </th>
                        <th className={styles.resultsTableCell}>Балл</th>
                      </tr>
                    </thead>
                    <tbody className={styles.resultsTableBody}>
                      {usersState.results
                        .filter((result) => result.testId === test.id)
                        .sort((a, b) => {
                          if (a.userId && b.userId) {
                            return a.userId > b.userId ? 1 : -1;
                          }
                          return 0; // Возвращаем 0, если userId одного из объектов не существует
                        })
                        .map((result, index) => (
                          <tr
                            key={result.id}
                            className={styles.resultsTableRow}
                          >
                            <th className={styles.resultsTableCell}>
                              {index + 1}
                            </th>
                            {usersState.isAdminPage && (
                              <th className={styles.resultsTableCell}>
                                {result.userId}
                              </th>
                            )}
                            <th className={styles.resultsTableCell}>
                              {section.name}
                            </th>
                            <th className={styles.resultsTableCell}>
                              {result.grade}/{result.answersCount}
                            </th>
                            <th className={styles.resultsTableCell}>
                              {result.percentCorrectAnswers}
                            </th>
                          </tr>
                        ))}
                      {!usersState.isAdminPage && (
                        <tr className={styles.testTotal}>
                          <th className={styles.testTotalCell}>
                            Средний балл:
                          </th>
                          <th className={styles.testTotalCell}></th>
                          <th className={styles.testTotalCell}></th>
                          {usersState.isAdminPage && (
                            <th className={styles.testTotalCell}></th>
                          )}
                          <th className={styles.testTotalCell}>
                            {averageTestGrade(test.id).toFixed(2)}
                          </th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ))}
              </div>
            </>
          );
        }

        return null;
      })}
    </>
  );
};

export default TestResult;
