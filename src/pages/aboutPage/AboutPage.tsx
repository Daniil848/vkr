import React from 'react';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo} />
        <p>
          Тема дипломной работы: Разработка WEB-приложения по контролю знаний
          сотрудников для учебно-методического центра по гражданской обороне,
          чрезвычайным ситуациям и пожарной безопасности.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
