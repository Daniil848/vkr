import React from 'react';
import { useTest } from './useTest';
import Button from '../../UI/Button';
import styles from './Test.module.scss';

const Test = () => {
  const { state, handleRadioChange, handleSubmit, result } = useTest();

  if (!state.test) return null;
  return (
    <>
      <div className={styles.container}>
        <p className={styles.testTitle}>{state.test?.title}:</p>
        {state.test?.questions?.map((item) => (
          <div key={item.id} className={styles.wrapper}>
            <p className={styles.testQuestion}>{item.question}</p>
            {item.answers.map((el) => (
              <div key={el.id} className={styles.testAnswers}>
                <input
                  type="radio"
                  disabled={Boolean(result)}
                  id={el.answer}
                  value={el.id}
                  name={item.question}
                  onChange={() => handleRadioChange(item.id, el.id)}
                  className={styles.testAnswersRadio}
                />
                <label htmlFor={el.answer} className={styles.testAnswersLabel}>
                  {el.answer}
                </label>
              </div>
            ))}
          </div>
        ))}
        {!result && (
          <div className={styles.buttonContainer}>
            <Button onClick={() => handleSubmit()} text="Завершить" />
          </div>
        )}
        {result && (
          <p className={styles.result}>
            Правильных ответов{' '}
            <span className={styles.resultCount}>{result}</span> из{' '}
            <span className={styles.resultCount}>
              {state.test.questions.length}
            </span>
          </p>
        )}
      </div>
    </>
  );
};

export default Test;
