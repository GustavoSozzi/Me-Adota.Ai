const express = require('express');
const { cadastrarAbrigo } = require('../controle/abrigoController');
const router = express.Router();

router.post('/cadastro', cadastrarAbrigo);

module.exports = router;