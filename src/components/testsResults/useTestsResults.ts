import { useState } from 'react';
import { Test } from '../../app/articlesTypes';
import { useAppSelector } from '../../app/hooks';

interface Props {
  userId: string | undefined;
}

interface ToggleById {
  [key: string]: boolean;
}

export const useTestsResults = (props: Partial<Props>) => {
  const usersState = useAppSelector((state) => state.usersSlice);
  const articlesState = useAppSelector((state) => state.articlesSlice);

  const [accordion, setAccordion] = useState<ToggleById>({});
  const [search, setSearch] = useState<{ [key: string]: string }>({});

  const handleAccordion = (testId: string) => {
    setAccordion((prevState: ToggleById) => ({
      ...prevState,
      [testId]: !prevState[testId] || false,
    }));
  };

  const handleSearch = (testId: string, value: string) => {
    setSearch((pervProductName) => ({
      ...pervProductName,
      [testId]: value,
    }));
  };

  const averageGradeInSection = (sectionId: string, userId: string) => {
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

  const testsInSection = (sectionId: string) => {
    return articlesState.tests.filter(
      (test) => test.sectionId.toString() === sectionId,
    );
  };

  const testsWithResults = (testsInSection: Test[]) => {
    return testsInSection.filter((test) =>
      usersState.results.some((result) =>
        usersState.isAdminPage
          ? result.testId === test.id
          : result.testId === test.id && result.userId === props.userId,
      ),
    );
  };

  const findUserName = (userId: string | undefined) => {
    const user = usersState.users.find((user) => user.id === userId);

    return user ? user.userName : '';
  };

  return {
    usersState,
    articlesState,
    search,
    handleSearch,
    accordion,
    handleAccordion,
    averageGradeInSection,
    averageTestGrade,
    testsInSection,
    testsWithResults,
    findUserName,
  };
};
