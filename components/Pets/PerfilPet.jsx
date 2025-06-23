import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PerfilPet.module.css';
import Button from '../Forms/Button';
import { FaMapMarkerAlt, FaHome } from 'react-icons/fa';

const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:8080/pets/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setPet(data);
        } else {
          setError(data.message || 'Erro ao carregar pet');
        }
      } catch (error) {
        setError('Falha na conexão com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleDonate = () => {
    navigate('/doacao', { state: { pet } });
  };

  const handleAdoptionInterest = () => {
    alert(`Interesse na adoção de ${pet.nome} registrado! O abrigo entrará em contato.`);
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!pet) return <div className={styles.error}>Pet não encontrado</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Perfil do Pet</h1>
      
      <div className={styles.petHeader}>
        <div className={styles.petImage}>
          <img src={pet.foto || 'https://via.placeholder.com/500x300'} alt={pet.nome} />
        </div>
      </div>
      
      <div className={styles.petInfo}>
        <div className={styles.infoSection}>
          <h2>Informações Básicas</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Nome:</span>
            <span>{pet.nome}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Idade:</span>
            <span>{pet.idade}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Status:</span>
            <span className={pet.status === 'disponível' ? styles.available : styles.adopted}>
              {pet.status === 'disponível' ? 'Disponível para adoção' : 'Adotado'}
            </span>
          </div>
        </div>
        
        <div className={styles.infoSection}>
          <h2>Localização</h2>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.infoIcon} />
            <span>{pet.localizacao}</span>
          </div>
          <div className={styles.infoItem}>
            <FaHome className={styles.infoIcon} />
            <span>{pet.abrigo?.nomeSocial || 'Abrigo não especificado'}</span>
          </div>
        </div>
        
        <div className={styles.infoSection}>
          <h2>Sobre</h2>
          <p className={styles.description}>{pet.descricao}</p>
        </div>
      </div>
      
      <div className={styles.actionButtons}>
        {pet.status === 'disponível' && (
          <Button onClick={handleAdoptionInterest}>Tenho interesse em adotar</Button>
        )}
        <Button onClick={handleDonate}>Apoiar Financeiramente</Button>
      </div>
    </div>
  );
};

export default PetProfile;
