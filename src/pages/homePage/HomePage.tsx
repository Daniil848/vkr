import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.title}>
            WEb-ресурс для проверки знаний сотрудников ГО и ЧС
          </p>
          <p className={styles.descriptionAbout}>
            Это веб-приложение разработано с целью обеспечения безопасности и
            эффективности в области гражданской обороны, чрезвычайных ситуаций и
            пожарной безопасности. Оно предоставляет инструменты для оценки и
            повышения уровня подготовки персонала, а также для мониторинга и
            управления его знаниями в этих важных областях.
          </p>
          <div className={styles.linkContainer}>
            <Link to={'/articles'} className={styles.link}>
              Приступить
            </Link>
          </div>
        </div>
        <span className={styles.line}></span>
        <div className={styles.content}>
          <p className={styles.title}>Для сотрудников в области ГО и ЧС:</p>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              <span>Обучение и повышение квалификации: </span>
              Наше приложение предоставляет доступ к качественным учебным
              материалам, курсам и тренировкам, позволяя сотрудникам постоянно
              совершенствовать свои навыки и знания.
            </p>
            <p className={styles.description}>
              <span>Тестирование и оценка: </span>
              Мы предоставляем возможность прохождения тестов и проверки знаний,
              что помогает сотрудникам регулярно оценивать свой уровень
              подготовки и выявлять области для улучшения.
            </p>
            <p className={styles.description}>
              <span>Мониторинг прогресса: </span>
              Наше приложение позволяет отслеживать и анализировать прогресс
              каждого сотрудника, помогая руководителям эффективно управлять
              обучением и подготовкой персонала.
            </p>
            <p className={styles.description}>
              <span>Эффективность и безопасность: </span>
              Мы стремимся обеспечить максимальную эффективность и безопасность
              работы сотрудников в условиях чрезвычайных ситуаций, предоставляя
              им необходимые знания и инструменты для быстрого и адекватного
              реагирования на любые угрозы.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
