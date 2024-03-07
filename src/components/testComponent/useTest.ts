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
  }, []);

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

    const score = correctAnswers
      ?.filter((val, index) => val === answersArr[index])
      .reduce((acc) => acc + 1, 0);

    setResult(score);
  };

  return {
    state,
    answers,
    handleRadioChange,
    handleSubmit,
    result,
  };
};
