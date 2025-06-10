import React from 'react';
import styles from './FeedDogsItem.module.css';
import { FOTO_GET } from '../../data/api';
import classNames from 'classnames';
import { Navigate, useNavigate } from 'react-router-dom';

const FeedDogsItem = ({ photo, index }) => {
  const navigate = useNavigate()

  function handleClick(){
    navigate(`/animal/${photo.id}`)
  }

  const itemClass = classNames(styles.photo, {
    [styles.highlight]: index === 1, // aplica se for o segundo item (índice começa em 0)
  });

  return (
    <li className={itemClass} onClick={handleClick}>
      <img
        src={FOTO_GET(photo.foto)}
        alt={`Foto de ${photo.nome}`}
        className={styles.image}
      />
    </li>
  );
};

export default FeedDogsItem;
