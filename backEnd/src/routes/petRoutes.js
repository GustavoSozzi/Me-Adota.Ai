const express = require('express');
const { cadastrarPet } = require('../controle/petController');
const router = express.Router();

router.post('/cadastro', cadastrarPet);

module.exports = router;