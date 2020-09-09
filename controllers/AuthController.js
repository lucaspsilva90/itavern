const { Usuario } = require('../models');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcrypt');


const transport = {
    service:"gmail",
    auth: {
      user: "testanto010599@gmail.com",
      pass: "fulera01"
    }
};

const AuthController = {
    
    login: async (req,res) => {

        let {email, senha} = req.body;

        usuario = await Usuario.findOne({where:{email}});
        // console.log(usuario);

        if(!usuario){
            return res.status(401).json({message:"Usuário e senha não correspondem."})
        }

        if(!bcrpyt.compareSync(senha, usuario.senha)){
            return res.status(401).json({message:"Usuário e senha não correspondem."})
        }
        
        req.session.idUsuario = usuario.id
        req.session.usuario = usuario
        return res.status(200).json({});

    },
    recSenha: async (req, res) =>{

        // busca o usuario
        let usuario = await Usuario.findOne({
            where:{
                email:req.body.emailRec
            },
            attributes:{
                exclude:['createdAt','updatedAt','senha']
            }
        })

        if(usuario == null){
            return res.status(401).json({message:'Email não encontrado.'});
        }

        //token do usuario
        let token = jwt.sign({usuario},"KEYMASTER",{ expiresIn: 60 * 60 });

        // construindo o transporter que vai levar o email
        const transporter = nodemailer.createTransport(transport);

        // construindo msg do email
        let msg = `Para recuperar sua senha acesse o link: http://localhost:3000/login/${token} e mude sua senha. Esse é um email automático, por favor não responda.`

        // construindo o email com base no formulario
        const email = {
            from: "testanto010599@gmail.com",
            to: req.body.emailRec,
            subject: "Sua senha iTavern",
            text: msg,
        };
        // enviar o email
        transporter.sendMail(email)

        res.status(200).json({})
    },
    mandaMudar: async (req, res) =>{
        let { token } = req.params;
        let infoToken = jwt.verify(token,"KEYMASTER",(err, verifiedJwt) =>{
            if(err){
                return undefined;
            }
            return verifiedJwt;
        })

        if(infoToken == undefined){
            // res.render('index',{liberaMudança:"bloqueado"})
            //ARRUMAR A RESPOSTA EM CASO DE TOKEN EXPIRADO
            res.send("token expirado")
        }

        req.session.token = infoToken.usuario

        res.redirect('/')
    },
    updateSenha: async (req, res) =>{
        let { email, senha } = req.body;

        senha = bcrpyt.hashSync(senha, 10);

        await Usuario.update({
            senha: senha
        },{
            where:{
                email:email
            }
        })

        req.session.usuario = req.session.token;
        req.session.idUsuario = req.session.token.id;

        res.status(200).json({});
    }
}


module.exports = AuthController