import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTestByArticleId, setTestError } from '../../app/articlesSlice';
import {
  getAllResults,
  openLogIn,
  openSignIn,
  sendTestResult,
} from '../../app/usersSlice';
import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';

export const useTest = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const usersState = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();

  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showTest, setShowTest] = useState<boolean>(false);

  const { articleID } = useParams();

  const cookie = Cookies.get('userId');

  useEffect(() => {
    if (articleID) dispatch(getTestByArticleId(articleID));
  }, [articleID]);

  useEffect(() => {
    dispatch(getAllResults());
  }, [showTest, showResult, usersState.authorized]);

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
      setShowResult(true);
      setShowTest(false);

      const countCorrectAnswers = correctAnswers
        .filter((val, index) => val === answersArr[index])
        .reduce((acc) => acc + 1, 0); // количество правильных ответов

      const percentCorrectAnswers =
        (countCorrectAnswers / articlesState.test.questions.length) * 100; // процент правильных ответов

      dispatch(
        sendTestResult({
          id: nanoid(),
          userId: cookie,
          testId: articlesState.test?.id,
          sectionId: articlesState.test?.sectionId,
          grade: countCorrectAnswers,
          answersCount: articlesState.test.questions.length,
          percentCorrectAnswers: percentCorrectAnswers,
        }),
      );
      setAnswers({});
    } else {
      dispatch(setTestError(true));
      return;
    }
  };

  const userResults = usersState.results.filter(
    (result) =>
      result.testId == articlesState.test?.id &&
      result.userId == usersState.user?.id,
  );

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
    setAnswers,
    handleSubmit,
    userResults,
    handleOpenLogIn,
    handleOpenSignIn,
    showTest,
    setShowTest,
    cookie,
  };
};
