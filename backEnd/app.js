import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

import { getAdministradores, createAdministrador } from './database.js';

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

app.post('/administrador_rota', async (req, res) => {
  const { nomeCompleto, contents } = req.body;
  const administrador_rota = await createAdministrador(nomeCompleto, contents);
  res.status(201).json(administrador_rota);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
