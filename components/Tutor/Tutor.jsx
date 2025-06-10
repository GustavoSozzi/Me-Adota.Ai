import styles from '../../components/Tutor/Conta.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Dogs from '../../img/svg/Dog.Svg?react';
import IconPontos from '../../img/svg/icon_pontos.png?react';
import user_icon from '../../img/svg/user_icon.svg?react';
import { useEffect, useState } from 'react';
import FeedTutor from './FeedTutor';

const Tutor = () => {
  const [tutorNome, setTutorNome] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTutor = localStorage.getItem('tutor');
    if (storedTutor) {
      try {
        const parsed = JSON.parse(storedTutor);
        setTutorNome(parsed.nomeCompleto);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Erro ao ler tutor do localStorage', e);
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tutor')
    navigate('/login')
  } 

  return (
    <div>
      <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          {''}
          <ul>
            <li>
              <Link to="/" aria-label="Dogs - Home" className={styles.link}>
                <img src={Dogs} alt="Dog Shelter" />
                <img src={IconPontos} alt="Icon Pontos" />
              </Link>
            </li>
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
            <li className={styles.userSection}>
              <span className={`${styles.link} ${styles.login}`}>
                {tutorNome}
              </span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                type="button"
                className={styles.link}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
                aria-label="Logout"
              >
                <img src={user_icon} alt="logout" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <FeedTutor />
    </div>
  );
};

export default Tutor;
