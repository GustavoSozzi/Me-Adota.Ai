import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './ShelterProfile.module.css';
import Button from '../Forms/Button';
import { FaPaw, FaPlus, FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ShelterProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [shelter, setShelter] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShelterData = async () => {
      try {
        // Buscar informações do abrigo
        const shelterResponse = await fetch(`http://localhost:8080/abrigos/${id}`);
        const shelterData = await shelterResponse.json();
        
        if (!shelterResponse.ok) {
          throw new Error(shelterData.message || 'Erro ao carregar abrigo');
        }

        // Buscar animais do abrigo
        const animalsResponse = await fetch(`http://localhost:8080/animais/abrigo/${id}`);
        const animalsData = await animalsResponse.json();

        setShelter(shelterData);
        setAnimals(animalsData || []);
      } catch (err) {
        setError(err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchShelterData();
  }, [id]);

  const isShelterOwner = user && user.type === 'shelter' && user.id === parseInt(id);

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!shelter) return <div className={styles.error}>Abrigo não encontrado</div>;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <h1>{shelter.razaoSocial}</h1>
          
          <div className={styles.contactInfo}>
            <p><FaMapMarkerAlt /> {shelter.endereco}</p>
            <p><FaPhone /> {shelter.telefone}</p>
            <p><FaEnvelope /> {shelter.email}</p>
          </div>

          <p className={styles.description}>{shelter.descricao || 'Este abrigo não possui uma descrição.'}</p>
        </div>

        {isShelterOwner && (
          <div className={styles.profileActions}>
            <Button onClick={() => navigate(`/editar-abrigo/${id}`)}>
              <FaEdit /> Editar Perfil
            </Button>
            <Button onClick={() => navigate('/cadastrar-pet')}>
              <FaPlus /> Adicionar Animal
            </Button>
          </div>
        )}
      </div>

      <div className={styles.animalsSection}>
        <h2>
          <FaPaw /> Animais sob cuidados deste abrigo
          {isShelterOwner && (
            <Link to="/cadastrar-pet" className={styles.addAnimalLink}>
              <FaPlus /> Adicionar novo
            </Link>
          )}
        </h2>

        {animals.length === 0 ? (
          <div className={styles.emptyMessage}>
            <p>Nenhum animal cadastrado neste abrigo.</p>
            {isShelterOwner && (
              <Button onClick={() => navigate('/cadastrar-pet')}>
                Cadastrar primeiro animal
              </Button>
            )}
          </div>
        ) : (
          <div className={styles.animalsGrid}>
            {animals.map(animal => (
              <div key={animal.id} className={styles.animalCard} onClick={() => navigate(`/animal/${animal.id}`)}>
                <img 
                  src={`http://localhost:8080/uploads/${animal.foto}`} 
                  alt={animal.nome} 
                  className={styles.animalImage}
                />
                <div className={styles.animalInfo}>
                  <h3>{animal.nome}</h3>
                  <p>{animal.idade}</p>
                  <p className={animal.status === 'disponível' ? styles.available : styles.adopted}>
                    {animal.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelterProfile;
