var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/AuthController");


router.post('/', AuthController.login);
router.post('/recSenha', AuthController.recSenha);
router.get('/:token', AuthController.mandaMudar);
router.post('/update', AuthController.updateSenha);



module.exports = router;