import React from 'react';
import Input from '../Forms/Input';
import useForm from '../Forms/useForm';
import { Link, useNavigate } from 'react-router-dom';
import dogAbrigo from '../../img/svg/dogAbrigo.png';
import SucessfullAbrigo from './SucessfullAbrigo';
import styles from './Abrigo.module.css';
import { ABRIGO_LOGIN, ABRIGO_REGISTER, SEND_MAIL } from '../../data/api';
import useFetch from '../../hooks/useFetch';

const CadastrarAbrigo = () => {
  const navigate = useNavigate();
  const razaoSocial = useForm();
  const email = useForm('email');
  const cnpj = useForm();
  const telefone = useForm();
  const endereco = useForm();
  const password = useForm();

  const { request, loading, error } = useFetch();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !razaoSocial.value.trim() ||
    !cnpj.value.trim() ||
    !email.value.trim() ||
    !telefone.value.trim() ||
    !password.value.trim() ||
    !endereco.value.trim()
  ) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const { url, options } = ABRIGO_REGISTER({
      razaoSocial: razaoSocial.value,
      cnpj: cnpj.value,
      email: email.value,
      telefone: telefone.value,
      password: password.value,
      endereco: endereco.value,
    });

    const { response } = await request(url, options);

    if (response.ok) {
      navigate('/abrigo/sucessfullAbrigo', { state: { email: email.value } });
      razaoSocial.setValue('');
      cnpj.setValue('');
      email.setValue('');
      telefone.setValue('');
      password.setValue('');
      endereco.setValue('');
    } else {
      alert('Erro ao cadastrar abrigo.');
    }
  } catch (error) {
    console.error(error);
    alert('Ocorreu um erro inesperado.');
  }
};

  return (
    <div>
      <header>
        <nav className={styles.nav}>
          <h1>Cadastrar seu Abrigo</h1>
          <ul>
            <li>
              <Link to="/" aria-label="Dogs - Home" className={styles.svg}>
                <img src={dogAbrigo} alt="Dog Abrigo" />
              </Link>
            </li>
          </ul>
          <h2>Close</h2>
        </nav>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <Input
            label="Razao Social"
            type="text"
            name="nomeSocial"
            placeholder="razao social"
            {...razaoSocial}
          />
        </div>
        <div>
          <Input
            label="CNPJ"
            type="text"
            name="cnpj"
            placeholder="cnpj"
            {...cnpj}
          />
        </div>
        <div>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="email"
            {...email}
          />
        </div>
        <div>
          <Input
            label="Telefone"
            type="text"
            name="telefone"
            placeholder="telefone"
            {...telefone}
          />
        </div>

        <div className={styles.fullWidth}>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="password"
            {...password}
          />
        </div>

        <div className={styles.fullWidth}>
          <Input
            label="Endereço"
            type="text"
            name="endereco"
            placeholder="endereco"
            {...endereco}
          />
        </div>

        <div className={styles.formButtons}>
          <button type="submit" className={styles.confirmBtn}
          >
            {loading ? 'Cadastrando...' : 'Confirmar'}
          </button>
        </div>

        {error && <p className={styles.error}>Erro: {error}</p>}
      </form>
    </div>
  );
};

export default CadastrarAbrigo;
