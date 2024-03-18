import React from 'react';
import { useTestResult } from './useTestResult';
import styles from './TestResult.module.scss';

interface Props {
  userId: string | undefined;
}

const TestResult = (props: Props) => {
  const { averageGrade, articlesState, usersState } = useTestResult(props);
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
            <div key={section.id} className={styles.resultsSection}>
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
                    averageGrade(section.id, props.userId).toFixed(0)}
                  %
                </p>
              </div>
              {testsWithResults.map((test) => (
                <ul key={test.id} className={styles.resultTest}>
                  <li>{test.title}:</li>
                  {usersState.results
                    .filter(
                      (result) =>
                        result.testId === test.id &&
                        result.userId === props.userId,
                    )
                    .map((result) => (
                      <li key={result.id} className={styles.resultGrade}>
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
    </>
  );
};

export default TestResult;
