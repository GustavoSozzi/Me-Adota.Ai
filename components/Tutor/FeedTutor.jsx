import React from 'react';
import styles from './FeedTutor.module.css';
import { useEffect } from 'react';

const FeedTutor = () => {

  useEffect(() => {

    async function handleSubmit(event){
          event.preventDefault();
    try{
      const response = await fetch('http://localhost:8080/animais', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
      });


    }catch(){

    }

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>
        ANIMAIS EM <br /> ACOMPANHAMENTO{' '}
      </h1>
      <div className={styles.cardsContainer}>
        {animais.map((animal) => (
          <div className={styles.card} key={animal.id}>
            <img
              src={animal.imagem}
              alt={animal.nome}
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
