import React, { useState } from 'react';
import styles from './FeedTutor.module.css';
import { useEffect } from 'react';
import { ANIMAIS_GET_TUTOR } from '../../data/api';

const FeedTutor = () => {
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    async function fetchAnimais() {
      try {
        const {url, options} = ANIMAIS_GET_TUTOR()
        const response = await fetch(url, options)

        if(!response.ok){
          throw new Error('Erro ao buscar animais')
        }
        const data = await response.json()
        setAnimais(data);
      } catch (error) {
        console.error('Erro ao buscar animais: ', error);
      }
    }

    fetchAnimais();
  }, []);

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>
        ANIMAIS EM <br /> ACOMPANHAMENTO{' '}
      </h1>
      <div className={styles.cardsContainer}>
        {animais.map((animal) => (
          <div className={styles.card} key={animal.id}>
            <img
              src={`http://localhost:8080/uploads/${animal.foto}`}
              alt={`Foto de ${animal.nome}`}
              className={styles.image}
            />
            <div className={`${styles.feed} animeLeft`}>
              <div className={styles.info}>
                <p><strong>{animal.nome}</strong></p>
                <p>{animal.idade}</p>
                <p className={`${styles.status} ${animal.status.toLowerCase()}`}>{animal.status}</p>
                <p>{animal.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedTutor;
