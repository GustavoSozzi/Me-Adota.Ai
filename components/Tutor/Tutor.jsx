import styles from '../../components/Tutor/Conta.module.css';
import { Link } from 'react-router-dom';
import Dogs from '../../img/svg/Dog.Svg?react';
import IconPontos from '../../img/svg/icon_pontos.png?react';
import user_icon from '../../img/svg/user_icon.svg?react';
import { useEffect, useState } from 'react';
import FeedTutor from './FeedTutor';

const Tutor = () => {
  const [tutorNome, setTutorNome] = useState('');

  useEffect(() => {
    const storedTutor = localStorage.getItem('tutor');
    if (storedTutor) {
      try {
        const parsed = JSON.parse(storedTutor);
        setTutorNome(parsed.nomeCompleto);
      } catch (e) {
        console.error('Erro ao ler tutor do localStorage', e);
      }
    }
  }, []);

  useEffect;

  return (
    <div>
      <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          {''}
          <ul>
            <li>
              <Link to="/" aria-label="Dogs  -Home" className={styles.link}>
                <img src={Dogs} alt="Dog Shelter" />
                <img src={IconPontos} alt="Icon Pontos" />
              </Link>
            </li>
            {/* Icone de menu*/}
            <li>
              <Link
                to="/Historico"
                className={`${styles.link} ${styles.login}`}
              >
                HISTORICO
              </Link>
            </li>
            <li>
              <Link to="/doacoes" className={`${styles.link} ${styles.login}`}>
                DOACOES
              </Link>
            </li>

            {/*Nome de usuario e icone*/}
            <li className={StyleSheet.userSection}>
              <span className={`${styles.link} ${styles.login}`}>
                {tutorNome}
              </span>
            </li>
            <Link to="/" aria-label="User - Icon" className={styles.link}>
              <img src={user_icon} alt="User Dogs" />
            </Link>
          </ul>
        </nav>
      </header>
      <FeedTutor/>
    </div>
  );
};

export default Tutor;
