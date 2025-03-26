const express = require('express');
const { getHistoricoDoacao } = require('../controle/historicoDoacaoController');
const router = express.Router();

router.post('/acessar', getHistoricoDoacao);

module.exports = router;