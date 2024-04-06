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

      const countCorrectAnswers = correctAnswers
        .filter((val, index) => val === answersArr[index])
        .reduce((acc) => acc + 1, 0);

      const percentCorrectAnswers =
        (countCorrectAnswers / articlesState.test.questions.length) * 100;

      dispatch(
        sendTestResult({
          id: nanoid(),
          userId: cookie,
          testId: articlesState.test?.id,
          sectionId: articlesState.test?.sectionId,
          correctAnswersCount: countCorrectAnswers,
          answersCount: articlesState.test.questions.length,
          percentCorrectAnswers: percentCorrectAnswers,
        }),
      );
      setAnswers({});
      setShowResult(true);
      setShowTest(false);
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

  const averageTestGrade = (testId: string) => {
    const gradesInTest = usersState.results
      .filter(
        (result) =>
          result.testId === testId && result.userId === usersState.user?.id,
      )
      .map((result) => result.percentCorrectAnswers);

    const average =
      gradesInTest.reduce((acc, number) => acc + number) / gradesInTest.length;

    return average;
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
    setAnswers,
    handleSubmit,
    userResults,
    averageTestGrade,
    showTest,
    setShowTest,
    handleOpenLogIn,
    handleOpenSignIn,
    cookie,
  };
};
