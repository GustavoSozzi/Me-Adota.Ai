import React from 'react';
import styles from './Sobre.module.css';
import logo from '../../img/svg/logo2.jpg';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';
import { Link } from 'react-router-dom';

const Sobre = () => {
  return (
    <div>
      <nav className={styles.nav}>
        {''}
        <ul>
          <li>
            <Link to="/" aria-label="Dogs - Home" className={styles.link}>
              <img src={icon_pontos} alt="pontos" />
              <img src={dog} alt="dog - nav" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.sobreContainer}>
        <header className={styles.sobreHeader}>
          <img src={logo} alt="Logo Me Adota Aí" className={styles.logo} />
          <h1>Sobre o Me Adota Aí</h1>
        </header>

        <section className={styles.sobreMain}>
          <p>
            O <strong>Me Adota Aí</strong> é uma plataforma dedicada a conectar
            abrigos de animais, tutores e pessoas dispostas a adotar ou ajudar
            financeiramente pets em situação de vulnerabilidade. Nosso objetivo
            é promover a adoção responsável, fortalecer ONGs e oferecer uma rede
            de apoio para os animais.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.card}>
            <h2>🐾 Adoção</h2>
            <p>
              Facilitamos a conexão entre tutores e pets que precisam de um lar
              amoroso.
            </p>
          </div>
          <div className={styles.card}>
            <h2>💰 Apoio</h2>
            <p>
              Permita que outras pessoas contribuam com doações para ajudar
              animais nos abrigos.
            </p>
          </div>
          <div className={styles.card}>
            <h2>📢 Visibilidade</h2>
            <p>
              Os abrigos ganham mais visibilidade e conseguem divulgar os
              animais com mais eficiência.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sobre;
