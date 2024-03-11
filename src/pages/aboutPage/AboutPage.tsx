import React from 'react';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo} />
        <p>
          Тема дипломной работы: WEb-ресурс для проверки знаний сотрудников ЧС
          (Пожарная часть)
        </p>
        <p>Разработал: студент группы 19СН1с - Ладыгин Даниил Львович</p>
      </div>
    </>
  );
};

export default AboutPage;
