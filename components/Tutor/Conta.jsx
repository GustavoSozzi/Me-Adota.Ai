import React from 'react';
import styles from '../../components/Tutor/Conta.module.css';
import Dogs from '../../img/svg/Dog.svg?react';
import Icon from '../../img/svg/icon_pontos.png?react';
import { Link } from 'react-router-dom';

const Conta = () => {
  return (
    
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        {''}
        <ul className={styles.menu}>
          {/* Icone de menu*/}
          <li>
            <Link to="/Historico" className={styles.link}>
              HISTORICO
            </Link>
          </li>
          <li>
            <Link to="/doacoes" className={styles.link}>
              DOACOES
            </Link>
          </li>

          {/*Nome de usuario e icone*/}
          <li className={StyleSheet.userSection}>
            <span className={styles.link}>FULANO DE TAL</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Conta;
