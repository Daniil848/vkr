import React from 'react';
import { useTestResult } from './useTestResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import styles from './TestResult.module.scss';

interface Props {
  userId: string | undefined;
}

const TestResult = (props: Props) => {
  const {
    articlesState,
    usersState,
    search,
    handleSearch,
    accordion,
    handleAccordion,
    averageGradeInSection,
    averageTestGrade,
    testsInSection,
    testsWithResults,
    findUserName,
  } = useTestResult(props);

  return (
    <>
      {articlesState.sections.map((section) => {
        if (testsWithResults(testsInSection(section.id)).length > 0) {
          return (
            <>
              <div key={section.id} className={styles.resultsSection}>
                <div className={styles.wrapper}>
                  <p className={styles.resultsSectionName}>
                    Курс: {section.name}
                  </p>
                  {!usersState.isAdminPage && (
                    <div className={styles.resultsSectionGrade}>
                      <p>
                        Тестов решено:{' '}
                        {
                          testsWithResults(testsInSection(section.id)).filter(
                            (test) => test.sectionId.toString() === section.id,
                          ).length
                        }
                        /{testsInSection(section.id).length}
                      </p>
                      <p>
                        Средний балл:{' '}
                        {props.userId &&
                          averageGradeInSection(
                            section.id,
                            props.userId,
                          ).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
                {testsWithResults(testsInSection(section.id)).map((test) => (
                  <div key={test.id} className={styles.tableContainer}>
                    <div className={styles.resultsTest}>
                      <button
                        onClick={() => handleAccordion(test.id)}
                        className={styles.resultsTestToggle}
                      >
                        {test.title}
                        <FontAwesomeIcon
                          icon={accordion[test.id] ? faCaretUp : faCaretDown}
                        />
                      </button>
                    </div>
                    {usersState.isAdminPage && accordion[test.id] && (
                      <div className={styles.inputContainer}>
                        <input
                          placeholder="Найти пользователя"
                          value={search[test.id]}
                          onChange={(e) =>
                            handleSearch(test.id, e.target.value)
                          }
                        />
                      </div>
                    )}
                    <table className={styles.resultsTable}>
                      {accordion[test.id] && (
                        <>
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
                              .filter((result) => {
                                if (result.testId !== test.id) {
                                  return false; // Пропускаем результаты тестов, которые не относятся к текущему тесту
                                }

                                if (
                                  search[test.id] &&
                                  search[test.id].trim() !== ''
                                ) {
                                  const userName = findUserName(
                                    result.userId,
                                  ).toLowerCase();
                                  const searchValue =
                                    search[test.id].toLowerCase();
                                  return userName.includes(searchValue);
                                }

                                return true;
                              })
                              .sort((a, b) => {
                                if (a.userId && b.userId) {
                                  return a.userId > b.userId ? 1 : -1;
                                }
                                return 0;
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
                                      {findUserName(result.userId)}
                                    </th>
                                  )}
                                  <th className={styles.resultsTableCell}>
                                    {section.name}
                                  </th>
                                  <th className={styles.resultsTableCell}>
                                    {result.correctAnswersCount}/
                                    {result.answersCount}
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
                        </>
                      )}
                    </table>
                  </div>
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
