import React, { useState } from 'react';
import styles from './FeedDogsItem.module.css';
import { FOTO_GET, PETS_REGISTER } from '../../data/api';
import classNames from 'classnames';
import { Navigate, useNavigate } from 'react-router-dom';
import { SEND_PAYMENT } from '../../data/api';
import useFetch from '../../hooks/useFetch';

const FeedDogsItem = ({ photo, index, setModalPhoto }) => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {url, options, request} = useFetch()
  const navigate = useNavigate()

  const handleClick = async () => {
    navigate(`/animal/${photo.id}`)
  }

  const handleDoarClick = async (e) => {
    e.stopPropagation();

    try{
      const {url, options} = SEND_PAYMENT({
        valor: 20.00,
        email: 'doador@exemplo.com'
      });
      const {response, json} = await request(url, options)

      if(json.point_of_interaction?.transaction_data?.qr_code_base64){
        setQrCodeData({
          petId: photo.id,
          qrCode: json.point_of_interaction.transaction_data.qr_code_base_64
        });
      }
    }catch(err){
      console.error('Erro ao criar pagamento',err)
    }finally{
      setLoading(false)
    }
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
      <button onClick={handleDoarClick}  className={styles.button}
      disabled={loading}>
        {loading ? 'Gerando QR Code...' : 'Doar com PIX'}
      </button>
      
      {qrCodeData && qrCodeData.petId === photo.id && qrCodeData.qrCode && (
        <div className={styles.qrcode}>
          <img src={`data:image/png;base64,${qrCodeData}`} alt="QR code doação" />
          <p>Escaneie para doar ❤️</p>
        </div>
      )}
    </li>
  );
};

export default FeedDogsItem;
