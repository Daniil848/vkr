import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllTests } from '../../app/mainSlice';
import { Link } from 'react-router-dom';
import styles from './TestsPage.module.scss';

const TestsPage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTests());
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        {state.tests.map((test) => (
          <div key={test.id}>
            <Link to={`/tests/test/${test.id}`}>{test.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestsPage;
