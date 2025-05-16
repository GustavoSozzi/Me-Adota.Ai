import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from '../Pets/RegisterPets.module.css';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';
import { useNavigate } from 'react-router-dom';

const RegisterPets = () => {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    descricao: '',
    localizacao: '',
    status: 'disponível',
  });
  const navigate = useNavigate();

  const [foto, setFoto] = useState(null);

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function handleFotoChange({ target }) {
    setFoto(target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('idade', form.idade);
    formData.append('descricao', form.descricao);
    formData.append('localizacao', form.localizacao);
    formData.append('status', form.status);
    if (foto) formData.append('foto', foto);

    try {
      const response = await fetch('http://localhost:8080/pets', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/pets/sucessfullPet');
        alert('Pet cadastrado com sucesso!');
        setForm({
          nome: '',
          idade: '',
          descricao: '',
          localizacao: '',
          status: '',
        });
        setFoto(null);
      } else {
        alert(data.message || 'Erro ao cadastrar Pet.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  return (
    <div className={styles.animeLeft}>
      <nav>
        <img src={icon_pontos} alt="pontos" />
        <img src={dog} alt="dog - nav" />
      </nav>
      <div className={`${styles.container} animeLeft`}>
        <h1>Cadastro de Pet</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            type="text"
            name="nome"
            placeholder="Nome do pet"
            value={form.nome}
            onChange={handleChange}
          />
          <Input
            label="Idade"
            type="text"
            name="idade"
            placeholder="Ex.: 2 anos"
            value={form.idade}
            onChange={handleChange}
          />
          <Input
            label="Descrição"
            type="text"
            name="descricao"
            placeholder="Conte mais sobre o Pet."
            value={form.descricao}
            onChange={handleChange}
          />
          <Input
            label="Localização"
            type="text"
            name="localizacao"
            placeholder="Cidade/Estado"
            value={form.localizacao}
            onChange={handleChange}
          />

          <label className={styles.labelStatus}>
            Status:
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="disponível">Disponível</option>
              <option value="adotado">Adotado</option>
            </select>
          </label>

          <label className={styles.label}>
            Foto:
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleFotoChange}
            />
          </label>

          <Button type="submit">Cadastrar Pet</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPets;
