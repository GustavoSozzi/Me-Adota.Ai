import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from '../../components/Tutor/Account.module.css';
import { Link } from 'react-router-dom';
import useForm from '../Forms/useForm';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';

const Register = () => {
  const nomeCompleto = useForm();
  const telefone = useForm();
  const cpf = useForm();
  const email = useForm('email');
  const password = useForm();
  const dataNascimento = useForm();

  async function handleSubmit(event) {
    event.preventDefault();

    const tutor = {
      nomeCompleto: nomeCompleto.value,
      telefone: telefone.value,
      cpf: cpf.value,
      email: email.value,
      password: password.value, // 🔹 Criptografar no backend
      dataNascimento: dataNascimento.value,
    };

    try {
      const response = await fetch('http://localhost:5000/tutores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutor),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
      } else {
        alert('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  return (
    <div>
      <nav>
        <img src={icon_pontos} alt="pontos" />
        <img src={dog} alt="dog - nav" />
      </nav>
      <div className={styles.container}>
        <div>
          <h1>Crie sua nova conta</h1>
          <div>
            <span>Já tem uma conta? </span>
            <Link to="/login/entrar">Login</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome completo"
              type="text"
              name="nomeCompleto"
              placeholder="Nome Completo"
              value={nomeCompleto.value}
              onChange={nomeCompleto.onChange}
              onBlur={nomeCompleto.onBlur}
            />
            <Input
              label="Telefone"
              type="text"
              name="telefone"
              placeholder="55 67 XXXXXXXXX"
              value={telefone.value}
              onChange={telefone.onChange}
              onBlur={telefone.onBlur}
            />
            <Input
              label="CPF"
              type="text"
              name="cpf"
              placeholder="XXX.XXX.XXX-XX"
              value={cpf.value}
              onChange={cpf.onChange}
              onBlur={cpf.onBlur}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="hello@gmail.com"
              value={email.value}
              onChange={email.onChange}
              onBlur={email.onBlur}
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="Password"
              value={password.value}
              onChange={password.onChange}
              onBlur={password.onBlur}
            />
            <Input
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              value={dataNascimento.value}
              onChange={dataNascimento.onChange}
              onBlur={dataNascimento.onBlur}
            />
            <Button>Criar Conta</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
