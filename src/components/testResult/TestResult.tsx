import React from 'react';
import { useTestResult } from './useTestResult';
import styles from './TestResult.module.scss';

interface Props {
  userId: string | undefined;
}

const TestResult = (props: Props) => {
  const { articlesState, usersState, averageGrade, averageTestGrade } =
    useTestResult(props);
  return (
    <>
      {articlesState.sections.map((section) => {
        const testsInSection = articlesState.tests.filter(
          (test) => test.sectionId.toString() === section.id,
        );
        const testsWithResults = testsInSection.filter((test) =>
          usersState.results.some(
            (result) =>
              result.testId === test.id && result.userId === props.userId,
          ),
        );

        if (testsWithResults.length > 0) {
          return (
            <>
              <div key={section.id} className={styles.resultsSection}>
                <div className={styles.wrapper}>
                  <p className={styles.resultsSectionName}>{section.name}:</p>
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
                        <th className={styles.resultsTableCell}>
                          Название курса
                        </th>
                        <th className={styles.resultsTableCell}>
                          Правильных ответов
                        </th>
                        <th className={styles.resultsTableCell}>Балл</th>
                      </tr>
                    </thead>
                    <tbody className={styles.resultsTableBody}>
                      {usersState.results
                        .filter(
                          (result) =>
                            result.testId === test.id &&
                            result.userId === props.userId,
                        )
                        .map((result, index) => (
                          <tr
                            key={result.id}
                            className={styles.resultsTableRow}
                          >
                            <th className={styles.resultsTableCell}>
                              {index + 1}
                            </th>
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
                      <tr className={styles.testTotal}>
                        <th className={styles.testTotalCell}>Средний балл:</th>
                        <th className={styles.testTotalCell}></th>
                        <th className={styles.testTotalCell}></th>
                        <th className={styles.testTotalCell}>
                          {averageTestGrade(test.id).toFixed(2)}
                        </th>
                      </tr>
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
