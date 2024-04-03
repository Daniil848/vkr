import React from 'react';
import { useAppSelector } from './app/hooks';
import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/homePage/HomePage';
import ArticlesPage from './pages/articlesPage/ArticlesPage';
import ArticlePage from './pages/articlePage/ArticlePage';
import AboutPage from './pages/aboutPage/AboutPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import AdminPage from './pages/adminPage/AdminPage';
import Registration from './components/registration/Registration';
import './App.css';

function App() {
  const usersState = useAppSelector((state) => state.usersSlice);
  return (
    <div className="App">
      <Header />
      {(usersState.signIn || usersState.logIn) && <Registration />}
      <div className="wrapper">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:articleID" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
