import React from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ArticlesPage />} />
        <Route path="/article/:articleID" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
