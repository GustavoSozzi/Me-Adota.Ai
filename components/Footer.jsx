import React from 'react';
import styles from './Footer.module.css';
import Dogs from '../img/svg/dogs.svg'
const Footer = () => {
  return (<footer className={styles.footer}>
    <img src={Dogs} alt="Me Adota Ai" />
    <p>Me adota ai. Alguns direitos reservados</p>
  </footer>);
};

export default Footer;
