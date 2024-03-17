import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>
          WEb-ресурс для проверки знаний сотрудников ЧС (Пожарная часть)
        </p>
        <div className={styles.linkContainer}>
          <Link to={'/articles'} className={styles.link}>
            Приступить
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
