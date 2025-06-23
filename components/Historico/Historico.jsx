import React from 'react';
import styles from './Historico.module.css';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';
import { Link } from 'react-router-dom';

const HistoricoDoacoes = () => {
  const doacoes = [
    {
      data: '02/01/2025',
      valor: '10,00R$',
      animal: 'Caramelo',
    },
    {
      data: '02/01/2025',
      valor: '10,00R$',
      animal: 'Julye',
    },
  ];

  return (
    <div className={styles.container}>
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
      <div className={styles.header}></div>
      <h2 className={styles.title}>Histórico de Doações</h2>

      <div className={styles.cardsContainer}>
        {doacoes.map((doacao, index) => (
          <div key={index} className={styles.card}>
            <p>
              <strong>Data:</strong> {doacao.data}
            </p>
            <p>
              <strong>Valor:</strong> {doacao.valor}
            </p>
            <p>
              <strong>Animal Beneficiado:</strong>{' '}
              <a href="#">{doacao.animal}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricoDoacoes;
