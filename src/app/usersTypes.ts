export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}
export interface Result {
  id: string;
  userId: string | undefined;
  testId: string | undefined;
  sectionId: number | undefined;
  grade: number | undefined;
  answersCount: number | undefined;
  percentCorrectAnswers: number;
}
export interface State {
  loading: boolean;
  error: boolean;
  signIn: boolean;
  logIn: boolean;
  authorized: boolean;
  user: User | null;
  users: User[];
  result: Result | null;
  results: Result[];
}
