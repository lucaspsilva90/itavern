var express = require("express");
var router = express.Router();

const CadastroController = require('../controllers/CadastroController');
const verificaUsusarioLogado = require('../middlewares/VerificaUsuarioLogado');
const uploadCover = require('../middlewares/uploadCover');

//recebe os dados via post do modal de cadastro
router.post("/submit", CadastroController.storage);
router.put("/update", verificaUsusarioLogado, uploadCover.single('imgPerfil') ,CadastroController.update);

module.exports = router;
