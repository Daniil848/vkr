import React from 'react';
import { useAppSelector } from './app/hooks';
import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/homePage/HomePage';
import ArticlesPage from './pages/articlesPage/ArticlesPage';
import ArticlePage from './pages/articlePage/ArticlePage';
import AboutPage from './pages/aboutPage/AboutPage';
import Loader from './UI/loader/Loader';
import Registration from './components/registration/Registration';
import './App.css';

function App() {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const usersState = useAppSelector((state) => state.usersSlice);
  return (
    <div className="App">
      <Header />
      {(usersState.signIn || usersState.logIn) && <Registration />}
      {articlesState.loading && <Loader />}
      <div className="container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:articleID" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
