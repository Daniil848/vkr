import React from 'react';
import { useTestResultModal } from './useTestResultModal';
import { Result } from '../../app/usersTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './TestResultModal.module.scss';

interface Props {
  result: Result;
}

const TestResultModal = (props: Props) => {
  const { isShowAnswers, handleShowAnswers, test } = useTestResultModal(props);

  return (
    <>
      <button
        onClick={() => handleShowAnswers(props.result.id)}
        className={styles.showButton}
      >
        Посмотреть ответы
      </button>
      {isShowAnswers[props.result.id] && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p className={styles.testTitle}>{test?.title}</p>
            <button
              onClick={() => handleShowAnswers(props.result.id)}
              className={styles.closeModal}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {test?.questions.map((question) => {
              const correctAnswer = question.answers.find(
                (answer) => answer.id === question.correctAnswer,
              );
              const userAnswer = question.answers.find((answer) =>
                props.result.answers.map(
                  (userAnswer) => userAnswer === answer.id,
                ),
              );

              return (
                <div key={question.id} className={styles.question}>
                  <p className={styles.questionText}>{question.question}</p>
                  <p>
                    <span>Правильный ответ:</span> {correctAnswer?.answer}
                  </p>
                  <p>
                    <span>Ответ пользователя:</span> {userAnswer?.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TestResultModal;
