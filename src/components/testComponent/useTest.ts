import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTest } from '../../app/mainSlice';

export const useTest = () => {
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

    const score = correctAnswers?.filter((value) =>
      answersArr.includes(value),
    ).length;

    setResult(score);
  };

  return {
    state,
    handleRadioChange,
    handleSubmit,
    result,
  };
};
