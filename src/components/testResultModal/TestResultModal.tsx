import React from 'react';
import { Result } from '../../app/usersTypes';
import styles from './TestResultModal.module.scss';

interface Props {
  result: Result;
}

const TestResultModal = (props: Props) => {
  return (
    <>
      <div className={styles.container}></div>
    </>
  );
};

export default TestResultModal;
