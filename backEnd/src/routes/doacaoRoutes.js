const express = require('express');
const { realizarDoacao } = require('../controle/doacaoController');
const router = express.Router();

router.post('/doação', realizarDoacao);

module.exports = router;