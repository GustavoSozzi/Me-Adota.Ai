import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from '../../components/Tutor/Account.module.css';
import { Link } from 'react-router-dom';
import useForm from '../Forms/useForm';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';

const Register = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  async function handleSubmit(event) {
    event.preventDefault();
    
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
            <span>Ja Existe? </span>
            <Link to="/login/entrar">Login</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome completo"
              type="text"
              name="username"
              placeholder="Nome Completo"
              {...username}
            />
            <Input
              label="Telefone"
              type="number"
              name="telefone"
              placeholder="55 67 XXXXXXXXX"
            />
            <Input
              label="CPF"
              type="text"
              name="cpf"
              placeholder="XXX.XXX.XXX-XX"
            />
            <Input
              label="Email"
              type="text"
              name="email"
              placeholder="hello@gmail.com"
              {...email}
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="Password"
              {...password}
            />
            <Input
              label="Data de Nascimento"
              type="text"
              name="text"
              placeholder="01/01/2000"
            />
          </form>
        <Button>
            Criar Conta
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
