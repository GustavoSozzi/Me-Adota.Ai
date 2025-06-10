import React, { useState } from 'react';
import styles from './FeedTutor.module.css';
import { useEffect } from 'react';

const FeedTutor = () => {
  const [animais, setAnimais] = useState([])

  useEffect(() => {
  async function fetchAnimais() {
    try {
      const response = await fetch('http://localhost:8080/animais', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar animais');
      }

      const data = await response.json();
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
            <div className={styles.info}>
              <p><strong>{animal.nome}</strong></p>
              <p>{animal.idade}</p>
              <p>{animal.status}</p>
              <p>{animal.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedTutor;