import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../feedPets/DetalhePet.module.css';
import PetDoacoes from '../../../img/svg/pet_doacoes.jpg?react';
import { ANIMAIS_GET_ID } from '../../../data/api';
import { FOTO_GET } from '../../../data/api';
import useFetch from '../../../hooks/useFetch';

const DetalhePet = () => {
  const { id } = useParams();
  console.log('id da url ' + id);
  const { data: animal, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = ANIMAIS_GET_ID(id);
    request(url, options);
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!animal) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          {''}
          <ul>
            <li>
              <Link to="/" aria-label="Dogs - Home" className={styles.link}>
                <img src={PetDoacoes} alt="Pet - Doacoes" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <h1 className={styles.title}>{animal.nome}</h1>
        <img
          src={FOTO_GET(animal.foto)}
          alt={animal.nome}
          className={styles.petImage}
        />
        <p>
          <strong>Idade:</strong> {animal.idade}
        </p>
        <p>
          <strong>Status:</strong> {animal.status}
        </p>
        <p>
          <strong>Descrição:</strong> {animal.descricao}
        </p>
      </div>
    </div>
  );
};

export default DetalhePet;
