import React, { Children } from "react";
import styles from '../Forms/Button.module.css';

const Button = ({children, ...props}) => {
  return (
    <button {...props} className={styles.button}>
    {children}
    </button>
  )
}

export default Button;