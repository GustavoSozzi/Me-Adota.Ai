import React from 'react';
import Input from '../Forms/Input';
import useForm from '../Forms/useForm';
import { Link } from 'react-router-dom';
import dogAbrigo from '../../img/svg/dogAbrigo.png';
import styles from './Abrigo.module.css';

const CadastrarAbrigo = () => {
  const nomeSocial = useForm();
  const email = useForm('email');
  const cnpj = useForm();
  const endereco = useForm();
  const telefone = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const abrigoData = {
      nomeSocial: nomeSocial.value,
      cnpj: cnpj.value,
      email: email.value,
      telefone: telefone.value,
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
        alert('Abrigo cadastrado com sucesso!');
        // Se quiser limpar os campos:
        nomeSocial.setValue('');
        cnpj.setValue('');
        email.setValue('');
        telefone.setValue('');
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
          <Input label="Nome Social" type="text" name="nomeSocial" {...nomeSocial} />
        </div>

        <div>
          <Input label="CNPJ" type="text" name="cnpj" {...cnpj} />
        </div>

        <div>
          <Input label="Email" type="email" name="email" {...email} />
        </div>

        <div>
          <Input label="Telefone" type="text" name="telefone" {...telefone} />
        </div>

        <div className={styles.fullWidth}>
          <Input label="Endereço" type="text" name="endereco" {...endereco} />
        </div>

        <div className={styles.formButtons}>
          <button type="button" className={styles.cancelBtn}>Cancelar</button>
          <button type="submit" className={styles.confirmBtn}>Confirmar</button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarAbrigo;
