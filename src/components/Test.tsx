import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getTest } from '../app/mainSlice';
import Button from '../UI/Button';
import styles from './Test.module.scss';

const Test = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState<number | undefined>();

  const { articleID } = useParams();

  useEffect(() => {
    const id = Number(articleID);
    dispatch(getTest(id));
  }, [result]);

  const handleRadioChange = (questionId: number, answerId: number) => {
    setAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    const answersArr = Object.values(answers);
    const correctAnswers = state.test?.questions.map((el) => el.correctAnswer);
    console.log('aa', answersArr);
    console.log('ca', correctAnswers);

    setResult(
      correctAnswers?.filter((value) => answersArr.includes(value)).length,
    );
  };

  console.log('result', result);

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
