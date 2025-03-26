import React from 'react';
import dogShelter from '../../img/svg/dogShelter.png';
import styles from './Feed.module.css';
import Button from '../Forms/Button';

const Feed = () => {
  return (
    <div className={styles.div}>
      <section className={styles.feedContainer}>
        <h1 className={styles.titulo}>ME ADOTA AI</h1>
        <div className={styles.conteudo}>
          <div className={styles.texto}>
            <p>
              Nossa missão é oferecer uma nova chance ao animais em situação de
              vulnerabilidade, promovendo cuidado, amor e oportunidades de
              adoção responsaveis.
            </p>
            <Button>Saiba mais</Button>
          </div>
          <img className={styles.imagem} src={dogShelter} alt="Dog Shelter" />
        </div>
      </section>
    </div>
  );
};

export default Feed;
