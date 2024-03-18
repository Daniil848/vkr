import React from 'react';
import { useTest } from './useTest';
import Button from '../../UI/button/Button';
import styles from './Test.module.scss';

const Test = () => {
  const {
    articlesState,
    usersState,
    handleRadioChange,
    handleSubmit,
    handleOpenLogIn,
    handleOpenSignIn,
    cookie,
  } = useTest();
  console.log(usersState.result);

  if (!articlesState.test) return null;
  return (
    <>
      {!articlesState.loading && (
        <div className={styles.container}>
          {!usersState.result ? (
            <>
              <p className={styles.testTitle}>{articlesState.test?.title}</p>
              {articlesState.test?.questions?.map((item) => (
                <div key={item.id} className={styles.wrapper}>
                  <p className={styles.testQuestion}>{item.question}</p>
                  {item.answers.map((el) => (
                    <div
                      key={el.id}
                      className={`${styles.testAnswers} ${usersState.result && item.correctAnswer === el.id ? styles.correct : ''}`}
                    >
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
            usersState.result && (
              <div className={styles.result}>
                <p className={styles.testTitle}>{articlesState.test?.title}</p>
                <p>
                  Правильных ответов{' '}
                  <span className={styles.resultCount}>
                    {usersState.result.grade}
                  </span>{' '}
                  из{' '}
                  <span className={styles.resultCount}>
                    {usersState.result.answersCount}
                  </span>
                </p>
                <p className={styles.resultPercent}>
                  <span className={styles.resultCount}>
                    {usersState.result.percentCorrectAnswers}
                  </span>{' '}
                  Баллов
                </p>
              </div>
            )
          )}
          {!cookie && (
            <div className={styles.lockTest}>
              <p className={styles.lockTestTitle}>
                Чтобы пройти тест зарегистрируйтесь!
              </p>
              <div className={styles.buttonsContainer}>
                <Button onClick={() => handleOpenSignIn()} text="Войти" />
                <Button onClick={() => handleOpenLogIn()} text="Регистрация " />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Test;
