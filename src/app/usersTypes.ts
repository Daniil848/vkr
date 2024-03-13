export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}
export interface Result {
  id: string;
  userId: string;
  testId: string | undefined;
  grade: number | undefined;
  answersCount: number | undefined;
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
