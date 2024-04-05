import { useAppSelector } from '../../app/hooks';

interface Props {
  userId: string | undefined;
}

export const useTestResult = (props: Partial<Props>) => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);

  const averageGrade = (sectionId: string, userId: string) => {
    const gradesInSection = usersState.results
      .filter(
        (item) =>
          item.sectionId?.toString() === sectionId &&
          props.userId &&
          item.userId === userId,
      )
      .map((el) => el.percentCorrectAnswers);

    const average =
      gradesInSection.reduce((acc, number) => acc + number) /
      gradesInSection.length;

    return average;
  };

  const averageTestGrade = (testId: string) => {
    const gradesInTest = usersState.results
      .filter(
        (result) => result.testId === testId && result.userId === props.userId,
      )
      .map((result) => result.percentCorrectAnswers);

    const average =
      gradesInTest.reduce((acc, number) => acc + number) / gradesInTest.length;

    return average;
  };

  return {
    usersState,
    articlesState,
    averageGrade,
    averageTestGrade,
  };
};
