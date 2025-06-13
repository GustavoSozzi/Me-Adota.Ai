import React from 'react';
import styles from './ConfirmationAbrigo.module.css';
import logo from '../../img/svg/pet_doacoes.jpg';
import { Link, useLocation } from 'react-router-dom';

const SucessfullAbrigo = () => {
  const location = useLocation();
  const email = location.state?.email || 'xxxxx@gmail.com'
  const onCancel = () => console.log('Cancelado');
  const onConfirm = () => console.log('Confirmado');

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <span>Obrigado por fazer parte!</span>
          <div className={styles.logoSection}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <Link to="/abrigo" arial-label="Home">
              <button className={styles.closeBtn}>Close</button>
            </Link>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.emailMessage}>
            UM EMAIL FOI ENVIADO CONFIRMANDO SUA CONTA PARA O EMAIL:{' '}
            <b>{email}</b>
          </div>
          <div className={styles.confirmText}>
            CONFIRME SUA CONTA PARA ENTRAR NO SISTEMA
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SucessfullAbrigo;
