import React from 'react';
import styles from './Button.module.scss';

const Button = (props: { text: string; onClick: () => void }) => {
  return (
    <button onClick={props.onClick} className={styles.button}>
      {props.text}
    </button>
  );
};

export default Button;
