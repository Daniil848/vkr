import React from 'react';
import styles from './Button.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

const Button = (props: Partial<Props>) => {
  return (
    <button onClick={props.onClick} className={styles.button}>
      {props.text}
    </button>
  );
};

export default Button;
