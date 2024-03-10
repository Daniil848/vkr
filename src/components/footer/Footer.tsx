import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <p className={styles.content}>
          Разработал студент группы 19СН1с: Ладыгин Даниил Львович
        </p>
      </div>
    </>
  );
};

export default Footer;
