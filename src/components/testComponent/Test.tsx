import React from 'react';
import { useTest } from './useTest';
import Button from '../../UI/button/Button';
import styles from './Test.module.scss';

const Test = () => {
  const { articlesState, handleRadioChange, handleSubmit, result } = useTest();

  if (!articlesState.test) return null;
  return (
    <>
      {!articlesState.loading && (
        <div className={styles.container}>
          <p className={styles.testTitle}>{articlesState.test?.title}:</p>
          {articlesState.test?.questions?.map((item) => (
            <div key={item.id} className={styles.wrapper}>
              <p className={styles.testQuestion}>{item.question}</p>
              {item.answers.map((el) => (
                <div
                  key={el.id}
                  className={`${styles.testAnswers} ${result && item.correctAnswer === el.id ? styles.correct : ''}`}
                >
                  <input
                    type="radio"
                    disabled={Boolean(result) && !articlesState.testError}
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
          {!result && (
            <div className={styles.resultContainer}>
              {articlesState.testError && (
                <p className={styles.buttonErrorText}>
                  Ответьте на все вопросы!
                </p>
              )}
              <div className={styles.buttonContainer}>
                <Button onClick={() => handleSubmit()} text="Завершить" />
              </div>
            </div>
          )}
          {result && (
            <p className={styles.result}>
              Правильных ответов{' '}
              <span className={styles.resultCount}>{result}</span> из{' '}
              <span className={styles.resultCount}>
                {articlesState.test.questions.length}
              </span>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Test;
