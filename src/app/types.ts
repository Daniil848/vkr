export interface Section {
  id: string;
  name: string;
}
export interface Article {
  id: string;
  sectionId: number;
  title: string;
  text: string;
}
export interface Test {
  id: string;
  articleId: number;
  sectionId: number;
  title: string;
  questions: {
    id: number;
    question: string;
    correctAnswer: number;
    answers: {
      id: number;
      answer: string;
    }[];
  }[];
}
export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
}
export interface State {
  sections: Section[];
  article: Article | null;
  articles: Article[];
  test: Test | null;
  tests: Test[];
  testError: boolean;
  loading: boolean;
  error: boolean;
  searchArticles: boolean;
  signIn: boolean;
  logIn: boolean;
  authorized: boolean;
  user: User | null;
  users: User[];
}
