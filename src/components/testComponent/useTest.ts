import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTestByArticleId, setTestError } from '../../app/articlesSlice';
import Cookies from 'js-cookie';
import { openLogIn, openSignIn, sendTestResult } from '../../app/usersSlice';
import { Result } from '../../app/usersTypes';

export const useTest = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const usersState = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState<number | undefined>();

  const { articleID } = useParams();

  const cookie = Cookies.get();

  useEffect(() => {
    if (articleID) dispatch(getTestByArticleId(articleID));
  }, []);

  const handleRadioChange = (questionId: number, answerId: number) => {
    setAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    const answersArr = Object.values(answers);
    const correctAnswers = articlesState.test?.questions.map(
      (el) => el.correctAnswer,
    );

    if (correctAnswers && answersArr.length < correctAnswers.length) {
      dispatch(setTestError(true));
    } else {
      dispatch(setTestError(false));
      const score = correctAnswers
        ?.filter((val, index) => val === answersArr[index])
        .reduce((acc) => acc + 1, 0);

      setResult(score);

      dispatch(
        sendTestResult({
          userId: cookie.userId,
          testId: articlesState.test?.id,
          grade: score,
          answersCount: articlesState.test?.questions.length,
        }),
      );
    }
  };

  const handleOpenSignIn = () => {
    dispatch(openSignIn());
  };

  const handleOpenLogIn = () => {
    dispatch(openLogIn());
  };

  return {
    articlesState,
    answers,
    handleRadioChange,
    handleSubmit,
    result,
    handleOpenLogIn,
    handleOpenSignIn,
    cookie,
  };
};
