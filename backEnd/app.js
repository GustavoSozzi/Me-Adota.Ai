import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { createTokenAbrigo, getTokenByAbrigoId, deleteTokenByAbrigoId } from "../backend/database.js";
import sendEmail from './utils/sendEmail.js';
import crypto from crypto;


import {
  createAbrigo,
  loginTutor,
  loginAbrigo,
  getAdministradores,
  createAdministrador,
  createTutor,
  createPet,
  getTutor,
  getTutores,
  getAnimais,
  getPetsByTutorId,
  getAnimalById,
} from './database.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// Servir arquivos estáticos da pasta de uploads
app.use('/uploads', express.static('uploads'));


app.get('/administrador', async (req, res) => {
  const administradores = await getAdministradores();
  res.send(administradores);
});

app.get('/administrador/:id', async (req, res) => {
  const id = req.params.id;
  const administrador = await getAdministradores(id);
  res.send(administrador);
});

app.post('/administrador', async (req, res) => {
  const { title, contents } = req.body;
  const administrador = await createAdministrador(title, contents);
  res.status(201).send(administrador);
});

app.post('/tutores', async (req, res) => {
  const { nomeCompleto, telefone, cpf, email, senha, dataNascimento } = req.body;

  try {
    const novoTutor = await createTutor(
      nomeCompleto,
      telefone,
      cpf,
      email,
      senha,
      dataNascimento,
    );
    res.status(201).json(novoTutor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o tutor.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const rows = await loginTutor(email, senha);
    if (rows.length > 0) {
      res.status(200).json({ message: 'Login bem-sucedido', tutor: rows[0] });
    } else {
      res.status(401).json({ error: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro no login', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.get('/tutores', async (req, res) => {
  const tutores = await getTutores();
  res.send(tutores);
});

app.get('/tutor/:id', async (req, res) => {
  const id = req.params.id;
  const tutor = await getTutor(id);
  res.send(tutor);
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });


app.post('/pets', upload.single('foto'), async (req, res) => {
  const { nome, idade, descricao, localizacao, status, abrigoId, tutorId } = req.body;
  const foto = req.file ? req.file.filename : null; 

  
  if (!nome || !idade || !descricao || !localizacao || !status || !foto) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {

    const novoPet = await createPet(nome, idade, descricao, localizacao, foto, status, abrigoId || null, tutorId || null);
    res.status(201).json({ message: 'Pet cadastrado com sucesso!', pet: novoPet });
  } catch (err) {
    console.error('Erro ao salvar pet:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});


app.post('/abrigos', async (req, res) => {
  const { razaoSocial, cnpj, email, telefone, password, endereco } = req.body;

  try {
    const novoAbrigo = await createAbrigo(
      razaoSocial,
      cnpj,
      email,
      telefone,
      password,
      endereco,
    );
    res.status(201).json(novoAbrigo);
  } catch (error) {
    console.error('Erro ao cadastrar abrigo:', error);
    res.status(500).json({ error: 'Erro ao cadastrar o abrigo.' });
  }
});

app.post('/login/abrigo', async(req, res) => {
  const {email, senha } = req.body;

  try{
    const rows = await loginAbrigo(email, senha);
    if(rows.length > 0){
      res.status(200).json({message: 'Login do abrigo bem- sucedido', abrigo: rows[0]});
    }else{
      res.status(401).json({error: 'Email ou senha invalidos'});
    }
  }catch(error){
    console.error('Erro no login do abrigo', error);
    res.status(500).json({error: 'Erro interno no servidor'});
  }
})

app.get('/animais', async(req, res) => {
  try{
    const animais = await getAnimais();
    res.status(200).json(animais);
  }catch(error){
    console.error("Erro ao buscar animais: ", error);
    res.status(500).json({error: "Erro ao buscar animais"})
  }
})

app.get('/animais/:id', async (req, res) => {
  const {id} = req.params;
  try{
    const [animal] = await getAnimalById(id)
    if(!animal){
      return res.status(404).json({message: 'Animal não encontrado'});
    }
    res.status(200).json(animal);
  }catch(error){
    console.error("Erro ao buscar animal por ID: ", error)
    res.status(500).json({message: 'Erro interno do servidor'})
  }
})

app.get('/pets/tutor/:tutorId', async(req, res) => {
  const {tutorId} = req.params

  try{
    const [pets] = await getPetsByTutorId(
      'SELECT * FROM pet WHERE tutorId = ?',
      [tutorId]
    )
    res.status(200).json(pets)
  }catch(err){
    console.error('Erro ao buscar pets do tutor:', err)
    res.status(500).json({message: 'Erro no servidor'})
  }
})

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

