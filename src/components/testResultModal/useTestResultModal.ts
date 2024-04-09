import { useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { Result } from '../../app/usersTypes';

interface Props {
  result: Result;
}

export const useTestResultModal = (props: Props) => {
  const articlesState = useAppSelector((state) => state.articlesSlice);

  const [isShowAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const handleShowAnswers = (resultId: string) => {
    setShowAnswers((prevState: { [key: string]: boolean }) => ({
      ...prevState,
      [resultId]: !prevState[resultId] || false,
    }));
  };

  const test = articlesState.tests.find(
    (test) => test.id === props.result.testId,
  );

  return {
    articlesState,
    isShowAnswers,
    handleShowAnswers,
    test,
  };
};
