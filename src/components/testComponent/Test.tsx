import React from 'react';
import { useTest } from './useTest';
import Button from '../../UI/button/Button';
import styles from './Test.module.scss';
import { Link } from 'react-router-dom';

const Test = () => {
  const {
    articlesState,
    usersState,
    handleRadioChange,
    setAnswers,
    handleSubmit,
    userResults,
    averageTestGrade,
    handleOpenLogIn,
    handleOpenSignIn,
    showTest,
    setShowTest,
    cookie,
  } = useTest();

  if (!articlesState.test) return null;
  console.log(userResults);

  return (
    <>
      {!articlesState.loading && (
        <div className={styles.container}>
          {userResults.length === 0 || showTest ? (
            <>
              <p className={styles.testTitle}>{articlesState.test?.title}</p>
              {articlesState.test?.questions?.map((item) => (
                <div key={item.id} className={styles.wrapper}>
                  <p className={styles.testQuestion}>{item.question}</p>
                  {item.answers.map((el) => (
                    <div key={el.id} className={styles.testAnswers}>
                      <input
                        type="radio"
                        disabled={
                          Boolean(usersState.result) && !articlesState.testError
                        }
                        id={el.answer}
                        value={el.id}
                        name={item.question}
                        onChange={() => handleRadioChange(item.id, el.id)}
                        className={styles.testAnswersRadio}
                      />
                      <label
                        htmlFor={el.answer}
                        className={styles.testAnswersLabel}
                      >
                        {el.answer}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <div className={styles.submitContainer}>
                {articlesState.testError && (
                  <p className={styles.buttonErrorText}>
                    Ответьте на все вопросы!
                  </p>
                )}
                <div className={styles.buttonContainer}>
                  <Button onClick={() => handleSubmit()} text="Завершить" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.result}>
                <table className={styles.resultTable}>
                  <caption className={styles.resultTableCaption}>
                    {articlesState.test?.title}
                  </caption>
                  <thead className={styles.resultTableHead}>
                    <tr className={styles.resultTableHeadRow}>
                      <th className={styles.resultTableHeadCell}>
                        Номер попытки
                      </th>
                      <th className={styles.resultTableHeadCell}>
                        Правильные ответы
                      </th>
                      <th className={styles.resultTableHeadCell}>Балл</th>
                      <th className={styles.resultTableHeadCell}>Результаты</th>
                    </tr>
                  </thead>
                  <tbody className={styles.resultTableBody}>
                    {userResults.map((result, index) => (
                      <tr key={result.id} className={styles.resultTableBodyRow}>
                        <th className={styles.resultTableBodyCell}>
                          {index + 1}
                        </th>
                        <th className={styles.resultTableBodyCell}>
                          {result.correctAnswersCount}/{result.answersCount}
                        </th>
                        <th className={styles.resultTableBodyCell}>
                          {result.percentCorrectAnswers}
                        </th>
                        <th
                          className={`${styles.resultTableBodyCell} ${styles.link}`}
                        >
                          <Link to={'/profile'}>Посмотреть все результаты</Link>
                        </th>
                      </tr>
                    ))}
                    <tr className={styles.testTotal}>
                      <th className={styles.testTotalCell}>Средний балл:</th>
                      <th className={styles.testTotalCell}></th>
                      <th className={styles.testTotalCell}>
                        {averageTestGrade(articlesState.test.id).toFixed(2)}
                      </th>
                      <th className={styles.testTotalCell}></th>
                    </tr>
                  </tbody>
                </table>
              </div>

              {userResults.length < 3 && (
                <div className={styles.buttonContainer}>
                  <Button
                    text="Повторить попытку"
                    onClick={() => {
                      setShowTest(!showTest);
                      setAnswers({});
                    }}
                  />
                </div>
              )}
            </>
          )}

          {!cookie && (
            <div className={styles.lockTest}>
              <p className={styles.lockTestTitle}>
                Чтобы пройти тест войдите или зарегистрируйтесь!
              </p>
              <div className={styles.buttonsContainer}>
                <Button onClick={() => handleOpenSignIn()} text="Войти" />
                <Button
                  onClick={() => handleOpenLogIn()}
                  text="Зарегистрироваться"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Test;
