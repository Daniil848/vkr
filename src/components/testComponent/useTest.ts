import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTestByArticleId, setTestError } from '../../app/articlesSlice';
import Cookies from 'js-cookie';
import { openLogIn, openSignIn } from '../../app/usersSlice';

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
