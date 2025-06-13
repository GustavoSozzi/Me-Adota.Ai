import React from 'react';
import Input from '../Forms/Input';
import useForm from '../Forms/useForm';
import { Link, useNavigate } from 'react-router-dom';
import dogAbrigo from '../../img/svg/dogAbrigo.png';
import SucessfullAbrigo from './SucessfullAbrigo';
import styles from './Abrigo.module.css';
import { ABRIGO_REGISTER, SEND_MAIL } from '../../data/api';
import useFetch from '../../hooks/useFetch';

const CadastrarAbrigo = () => {
  const navigate = useNavigate();
  const razaoSocial = useForm();
  const email = useForm('email');
  const cnpj = useForm();
  const telefone = useForm();
  const endereco = useForm();
  const password = useForm();

  const {request, loading, error} = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const abrigoData = {
      razaoSocial: razaoSocial.value,
      cnpj: cnpj.value,
      email: email.value,
      telefone: telefone.value,
      password: password.value,
      endereco: endereco.value,
    };

    try {
      const response = await fetch('http://localhost:8080/abrigos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(abrigoData),
      });

      if (response.ok) {
        const emailBody = {
          from: 'noreply@meadotaai.com.br',
          to: email.value,
          subject: 'Bem-vindo ao Me Adota!',
          message: `
          <h2>Olá ${razaoSocial.value},</h2>
          <p>Seu abrigo foi cadastrado com sucesso na plataforma <strong>Me Adota</strong>! 🐾</p>
          <p>Estamos muito felizes em tê-lo conosco. Agora você pode divulgar seus pets e receber apoio da comunidade.</p>
          <p><a href="http://localhost:3000/login">Clique aqui para acessar sua conta</a></p>
          <p>Se você não realizou este cadastro, por favor ignore este email.</p>
          <br/>
          <p>Equipe Me Adota ❤️</p>
        `,
        };

        const [mailUrl, mailOptions] = SEND_MAIL(emailBody);
        await request(mailUrl, mailOptions);

        navigate('/abrigo/sucessfullAbrigo', { state: { email: email.value } });
        razaoSocial.setValue('');
        cnpj.setValue('');
        email.setValue('');
        telefone.setValue('');
        password.setValue('');
        endereco.setValue('');
      } else {
        const error = await response.json();
        alert('Erro: ' + error.error);
      }
    } catch (err) {
      console.error('Erro ao cadastrar abrigo:', err);
      alert('Erro ao conectar com o servidor.');
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
          <button type="button" className={styles.cancelBtn}>
            Cancelar
          </button>
          <button type="submit" className={styles.confirmBtn}>
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarAbrigo;
