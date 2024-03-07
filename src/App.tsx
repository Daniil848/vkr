import React from 'react';
import { useAppSelector } from './app/hooks';
import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/homePage/HomePage';
import ArticlesPage from './pages/articlesPage/ArticlesPage';
import ArticlePage from './pages/articlePage/ArticlePage';
import TestsPage from './pages/testsPage/TestsPage';
import TestPage from './pages/testPage/TestPage';
import AboutPage from './pages/aboutPage/AboutPage';
import Loader from './UI/loader/Loader';
import './App.css';

function App() {
  const state = useAppSelector((state) => state.slice);
  return (
    <div className="App">
      <Header />
      {state.loading && <Loader />}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/article/:articleID" element={<ArticlePage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/tests/test/:testID" element={<TestPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
