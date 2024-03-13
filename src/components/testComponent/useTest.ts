import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTestByArticleId, setTestError } from '../../app/articlesSlice';
import Cookies from 'js-cookie';
import {
  getTestResult,
  openLogIn,
  openSignIn,
  sendTestResult,
} from '../../app/usersSlice';
import { nanoid } from 'nanoid';

export const useTest = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const usersState = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState({});

  const { articleID } = useParams();

  const cookie = Cookies.get();

  useEffect(() => {
    // сначала получаем тест и потом жем его id для получения результата
    if (articleID) {
      dispatch(getTestByArticleId(articleID)).then(() => {
        if (articlesState.test?.id) {
          dispatch(
            getTestResult({
              userId: cookie.userId,
              testId: articlesState.test.id,
            }),
          );
        }
      });
    }
  }, [articleID, articlesState.test?.id]);

  const handleRadioChange = (questionId: number, answerId: number) => {
    setAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    const answersArr = Object.values(answers); // массив ответов
    const correctAnswers = articlesState.test?.questions.map(
      (el) => el.correctAnswer,
    ); // массив правильных ответов

    if (
      correctAnswers &&
      answersArr.length === correctAnswers.length &&
      articlesState.test?.questions.length
    ) {
      dispatch(setTestError(false));

      const score = correctAnswers
        .filter((val, index) => val === answersArr[index])
        .reduce((acc) => acc + 1, 0); // счет количество правильных ответов

      const percentCorrectAnswers =
        (score / articlesState.test.questions.length) * 100; // процент правильных ответов

      dispatch(
        sendTestResult({
          id: nanoid(),
          userId: cookie.userId,
          testId: articlesState.test?.id,
          sectionId: articlesState.test?.sectionId,
          grade: score,
          answersCount: articlesState.test.questions.length,
          percentCorrectAnswers: percentCorrectAnswers,
        }),
      );
    } else {
      dispatch(setTestError(true));
      return;
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
    usersState,
    answers,
    handleRadioChange,
    handleSubmit,
    handleOpenLogIn,
    handleOpenSignIn,
    cookie,
  };
};
