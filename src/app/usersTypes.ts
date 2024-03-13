export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
}
export interface State {
  loading: boolean;
  error: boolean;
  signIn: boolean;
  logIn: boolean;
  authorized: boolean;
  user: User | null;
  users: User[];
}
