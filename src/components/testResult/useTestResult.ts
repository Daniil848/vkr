import { useAppSelector } from '../../app/hooks';

interface Props {
  userId: string | undefined;
}

export const useTestResult = (props: Props) => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);

  const averageGrade = (sectionId: string, userId: string) => {
    const arr = usersState.results
      .filter(
        (item) =>
          item.sectionId?.toString() === sectionId &&
          props.userId &&
          item.userId === userId,
      )
      .map((el) => el.percentCorrectAnswers);

    const average = arr.reduce((acc, number) => acc + number, 0) / arr.length;

    return average;
  };

  return {
    averageGrade,
    articlesState,
    usersState,
  };
};
