import React, { useContext, useEffect, useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from '../Pets/RegisterPets.module.css';
import dog from '../../img/svg/Dog.svg';
import icon_pontos from '../../img/svg/icon_pontos.png';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { PETS_REGISTER } from '../../data/api';
import { UserContext } from '../../hooks/userContext';

const RegisterPets = () => {
  const { usuario } = useContext(UserContext);

  const [form, setForm] = useState({
    nome: '',
    idade: '',
    descricao: '',
    localizacao: '',
    status: 'disponível',
    abrigoId: '',
  });

  const [foto, setFoto] = useState(null);
  const [abrigoNome, setAbrigoNome] = useState('');
  const navigate = useNavigate();
  const { request, loading, error } = useFetch();
  console.log('passei aqui register pets');

  useEffect(() => {
    if (!usuario || usuario.id) {
      navigate('/abrigo/login');
      return;
    }
    setAbrigoNome(usuario.abrigo?.razaoSocial || usuario.nome || 'Abrigo');
    setForm((prev) => ({ ...prev, abrigoId: usuario.abrigo.id }));
  }, [usuario, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    navigate('/');
  }

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
    formData.append('abrigoId', form.abrigoId);

    if (foto) formData.append('foto', foto);

    const { url, options } = PETS_REGISTER(formData);
    const { response, json } = await request(url, options);

    if (response.ok) {
      navigate('/pets/sucessfullPet');
      setForm({
        nome: '',
        idade: '',
        descricao: '',
        localizacao: '',
        status: '',
      });
      setFoto(null);
    } else {
      alert(json?.message || 'Erro ao cadastrar Pet.');
    }
  }

  return (
    <div className={styles.animeLeft}>
      <nav>
        <Link to="/" arial-label="Dogs-Home">
          <img src={icon_pontos} alt="pontos"/>
          <img src={dog} alt="dog - nav" onClick={handleLogout}/>
        </Link>
        <li className={styles.userSection}>
          <span className={`${styles.link} ${styles.login}`}>
            {abrigoNome && `Bem-vindo, ${abrigoNome}`}
          </span>
        </li>
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

          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Pet'}
          </Button>

          {error && <p className={styles.error}>Erro: {error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPets;
