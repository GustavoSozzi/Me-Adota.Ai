import React, { useState, useEffect } from 'react';
import styles from './DonationHistory.module.css';
import { useNavigate } from 'react-router-dom';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!userId || !token) {
          throw new Error('Usuário não autenticado');
        }

        const response = await fetch(`http://localhost:8080/doacoes?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar doações');
        }

        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando histórico de doações...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Histórico de Doações</h1>
      
      {donations.length === 0 ? (
        <div className={styles.emptyMessage}>
          <p>Você ainda não realizou nenhuma doação.</p>
          <button 
            className={styles.button}
            onClick={() => navigate('/')}
          >
            Conhecer animais para apoiar
          </button>
        </div>
      ) : (
        <div className={styles.donationsList}>
          {donations.map((donation) => (
            <div key={donation.id} className={styles.donationCard}>
              <div className={styles.donationInfo}>
                <h3>{donation.animalNome || 'Animal não especificado'}</h3>
                <p><strong>Data:</strong> {formatDate(donation.data)}</p>
                <p><strong>Valor:</strong> {formatCurrency(donation.valor)}</p>
                <p><strong>Método:</strong> {donation.metodoPagamento || 'PIX'}</p>
                {donation.comprovante && (
                  <a 
                    href={`http://localhost:8080/uploads/${donation.comprovante}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.receiptLink}
                  >
                    Ver comprovante
                  </a>
                )}
              </div>
              <div className={styles.animalInfo}>
                {donation.animalFoto && (
                  <img 
                    src={`http://localhost:8080/uploads/${donation.animalFoto}`} 
                    alt={donation.animalNome} 
                    className={styles.animalImage}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;