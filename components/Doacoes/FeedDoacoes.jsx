import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './FeedDoacoes.module.css';
import PetDoacoes from '../../img/svg/pet_doacoes.jpg?react'
import Loading from '../Feed/Account/Loading';
import { ANIMAIS_GET } from '../../data/api';
import useFetch from '../../hooks/useFetch';
import Error from '../../hooks/helper/Error';
import FeedDogsItem from './FeedDogsItem';

const FeedDoacoes = ({page, user, setModalPhoto, setInfinite}) => {
  const {data, loading, error, request} = useFetch()


  useEffect(() => {
    async function fetchAnimais() {
      const total = 3;
      const {url, options} = ANIMAIS_GET({page, total, user});
      const {response, json} = await request(url, options);
      console.log("Request: ", json);
      if(response && response.ok && json.length < total){
        setInfinite(false)
      };
    }
    fetchAnimais();
  }, [request, user, page, setInfinite]);

  if(error) return <Error error={error}/>
  if(loading) return <Loading/>;

  if (data)
  return (
    <div>
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
      <div className={styles.feedContainer}>
        <h1 className={styles.title}>
          ANIMAIS PARA <br /> DOACAO{' '}
        </h1>
        <div className={styles.cardsContainer}>
          <ul className={`${styles.feed} animeLeft`}>
          {data && data.map((animal, index) => (
            <FeedDogsItem
            key={animal.id}
            index={index}
            photo={animal}
            setModalPhoto={setModalPhoto}
          />
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default FeedDoacoes;


/*<div className={styles.card} key={animal.id}>
              <Link to={`/animal/${animal.id}`}>
              <img
                src={`http://localhost:8080/uploads/${animal.foto}`}
                alt={`Foto de ${animal.nome}`}
                className={styles.image}
              />
              </Link>
              <div className={styles.info}>
                <p>
                  <strong>{animal.nome}</strong>
                </p>
                <p>{animal.idade}</p>
                <p>{animal.status}</p>
                <p>{animal.descricao}</p>
              </div>
            </div>
*/