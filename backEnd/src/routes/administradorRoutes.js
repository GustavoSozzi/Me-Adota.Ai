const express = require('express');
const { aprovarAbrigo } = require('../controle/administradorController');
const router = express.Router();

router.post('/aprovação', aprovarAbrigo);

module.exports = router;