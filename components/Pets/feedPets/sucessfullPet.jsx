import React from 'react';
import dog from '../../../img/svg/Dog.svg';
import icon_pontos from '../../../img/svg/icon_pontos.png';
import styles from './sucessFullPet.module.css';

const SucessfullPet = () => {
  return (
    <div className={styles.sucess_container}>
      <nav className={styles.sucess_nav}>
        <img src={icon_pontos} alt="ícone de pontos" className={styles.icon_pontos} />
        <img src={dog} alt="dog nav" className={styles.icon_dog} />
      </nav>

      <div className={styles.sucess_content}>
        <h1>Pet cadastrado com sucesso! 🎉</h1>
        <p>O novo amiguinho agora faz parte da nossa plataforma 🐾</p>
        <button onClick={() => window.location.href = '/pets'}>Voltar para o cadastro de pets</button>
      </div>
    </div>
  );
};

export default SucessfullPet;
