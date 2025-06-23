import React, { useContext } from 'react';
import useForm from '../Forms/useForm';
import Input from '../Forms/Input';
import styles from './Abrigo.module.css';
import { ABRIGO_LOGIN } from '../../data/api';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../hooks/userContext';
import { Link } from 'react-router-dom';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';

const LoginAbrigo = () => {
  const email = useForm('email');
  const senha = useForm('password');
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const { url, options } = ABRIGO_LOGIN({
      email: email.value,
      senha: senha.value,
    });

    const { response, json } = await request(url, options);

    if (response && response.ok) {
      loginUser({ tipo: 'abrigo', ...json });
      alert('Login realizado com sucesso!');
      navigate('/pets');
    } else {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <nav className={styles.navLogin}>
        {''}
        <ul>
          <li>
            <Link to="/" arial-label="Dogs - Home" className={styles.link}>
              <img src={icon_pontos} alt="pontos" />
              <img src={dog} alt="dog - nav" />
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className={styles.titleLoginAbrigo}>Login do Abrigo</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          {...email}
          placeholder="abrigo@email.com"
        />
        <Input
          label="Senha"
          type="password"
          name="senha"
          placeholder="password"
          {...senha}
        />

        <div className={styles.formButtons}>
          <button
            type="submit"
            className={styles.confirmBtn}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        {error && <p className={styles.error}>Erro: {error}</p>}
      </form>
    </div>
  );
};

export default LoginAbrigo;
