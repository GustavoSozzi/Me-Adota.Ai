import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importando as rotas
import abrigoRoutes from './routes/abrigoRoutes.js';
import administradorRoutes from './routes/administradorRoutes.js';
import doacaoRoutes from './routes/doacaoRoutes.js';
import historicoDoacaoRoutes from './routes/historicoDoacaoRoutes.js';
import petRoutes from './routes/petRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// Definição das rotas principais
app.use('/abrigo', abrigoRoutes);
app.use('/administrador', administradorRoutes);
app.use('/doacao', doacaoRoutes);
app.use('/historicoDoacao', historicoDoacaoRoutes);
app.use('/pet', petRoutes);
app.use('/tutor', tutorRoutes);

// Rota inicial para verificar funcionamento
app.get('/', (req, res) => {
  res.send('API do Me Adota Aí está rodando! 🚀');
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
