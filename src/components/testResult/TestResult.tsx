import React from 'react';
import styles from './TestResult.module.scss';
import { useAppSelector } from '../../app/hooks';

interface Props {
  userId: string | undefined;
}

const TestResult = (props: Props) => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);

  const averageGrade = (sectionId: string, userId: string) => {
    const arr = usersState.results
      .filter(
        (item) =>
          item.sectionId?.toString() === sectionId &&
          props.userId &&
          item.userId === userId,
      )
      .map((el) => el.percentCorrectAnswers);

    const average = arr.reduce((acc, number) => acc + number, 0) / arr.length;

    return average;
  };

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
              <div className={styles.resultsSectionTitle}>
                <p>{section.name}:</p>
                <p>
                  Средний балл:{' '}
                  {props.userId && averageGrade(section.id, props.userId)}%
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
