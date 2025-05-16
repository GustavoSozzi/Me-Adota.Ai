import React from 'react';
import styles from '../../components/Tutor/Account.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../../hooks/helper/Head';
import Input from '../Forms/Input';
import useForm from '../Forms/useForm';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';

const Account = () => {
  const email = useForm('email');
  const senha = useForm();
  const navigate = useNavigate(); //redirecionamento

  async function handleSubmit(event) {
    event.preventDefault();

    const loginData = {
      email: email.value,
      senha: senha.value,
    };

    console.log('Enviando dados:', loginData);

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login realizado com sucesso!');
        //localStorage data
        localStorage.setItem('tutor', JSON.stringify(data.tutor));
        console.log(response.data);
        navigate('/tutor')
      } else {
        console.log('response', response)
        alert('Email ou senha invalidos!');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro no login. Tente novamente');
    }
  }

  return (
    <div className={styles.container}>
      <nav>
        <img src={icon_pontos} alt="pontos" />
        <img src={dog} alt="dog - nav" />
      </nav>
      <Head title="Login" />
      <div>
        <h1>Entre em Sua Conta</h1>
        <form onSubmit={handleSubmit} className={`${styles.form} container`}>
          <Input label="Email" type="text" name="email" {...email} />
          <Input label="Senha" type="password" name="senha" {...senha} />

          <button
            type="submit"
            style={{
              backgroundColor: '#2F4F4F',
              color: 'white',
              padding: '12px 20px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Entrar
          </button>
        </form>
        <div className={styles.links}>
          <Link to="/login/perdeu">Esqueceu a senha?</Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
