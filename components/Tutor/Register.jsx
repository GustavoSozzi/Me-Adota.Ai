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
  const senha = useForm();
  const dataNascimento = useForm('date');


  async function handleSubmit(event) {
    event.preventDefault();

    if (!nomeCompleto.value || !telefone.value || !cpf.value || !email.value || !senha.value || !dataNascimento.value) {
      alert('Preencha todos os campos!');
      return;
    }

    const tutor = {
      nomeCompleto: nomeCompleto.value.trim(),
      telefone: telefone.value.trim(),
      cpf: cpf.value.replace(/\D/g, ''), 
      email: email.value.trim(),
      senha: senha.value, 
      dataNascimento: dataNascimento.value,
    };

    try {
      const response = await fetch('http://localhost:8080/tutores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutor),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor.');
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
            <Input label="Nome completo" type="text" name="nomeCompleto" placeholder="Nome Completo" {...nomeCompleto} />
            <Input label="Telefone" type="text" name="telefone" placeholder="55 67 XXXXXXXXX" {...telefone} />
            <Input label="CPF" type="text" name="cpf" placeholder="XXX.XXX.XXX-XX" {...cpf} />
            <Input label="Email" type="email" name="email" placeholder="hello@gmail.com" {...email} />
            <Input label="Senha" type="password" name="senha" placeholder="Password" {...senha} />
            <Input label="Data de Nascimento" type="date" name="dataNascimento" {...dataNascimento} />
            <Button>Criar Conta</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
