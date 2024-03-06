import React from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/homePage/HomePage';
import ArticlesPage from './pages/articlesPage/ArticlesPage';
import ArticlePage from './pages/articlePage/ArticlePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/article/:articleID" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
