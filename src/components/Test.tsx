import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getTest } from '../app/mainSlice';
import styles from './Test.module.scss';

const Test = (articleID: any) => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = Number(articleID);
    dispatch(getTest(id));
    console.log(state.test);
  }, []);

  if (!state.test) return null;
  return (
    <>
      <div>
        <p>{state.test.title}</p>
        {state.test.questions?.map((question) => (
          <div key={question.id}>
            <p>{question.question}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
