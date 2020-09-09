var express = require("express");
var router = express.Router();
var verificaUsuarioLogado = require('../middlewares/VerificaUsuarioLogado');

const GruposController = require("../controllers/GruposController");
const uploadCover = require('../middlewares/uploadCover');

/* GET home page. */
router.get("/", verificaUsuarioLogado, GruposController.index);
router.get("/search/", verificaUsuarioLogado, GruposController.search);
router.post('/criargrupo', verificaUsuarioLogado, uploadCover.single('imgGrupo'), GruposController.store);
router.get("/editarGrupos", verificaUsuarioLogado, GruposController.showEdit);
router.put("/:id/update", verificaUsuarioLogado, uploadCover.single('imgGrupo'), GruposController.update);
router.delete("/:id/delete", verificaUsuarioLogado, GruposController.delete);
router.post('/addNoGrupo', verificaUsuarioLogado, GruposController.addGrupo);
router.get("/teste", GruposController.teste);
router.post('/ceps', verificaUsuarioLogado, GruposController.ceps);

module.exports = router;