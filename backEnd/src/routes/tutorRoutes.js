const express = require('express');
const { cadastroTutor } = require('../controle/tutorController');
const router = express.Router();

router.post('/cadastro', cadastroTutor);

module.exports = router;