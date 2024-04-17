import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <p className={styles.content}>
          &copy; 2024 Учебно-методический ресурс по ГО и ЧС.
        </p>
      </div>
    </>
  );
};

export default Footer;
