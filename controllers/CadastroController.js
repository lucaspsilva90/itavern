const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const saltosDoHash = 10;

module.exports = {

    //cria um registro no DB com novo usuário
    storage: async (req,res) => {

            //recuperando dados do forms através do objeto body
            let {nome, nickname, email, senha} = req.body;

            
            if(!nome || !nickname || !email || !senha){
                return res.status(401).json({message:"Preencha todo o formulário!"})
            }

            //hashing na senha
            senha = bcrypt.hashSync(senha, saltosDoHash);


            //buscando por email já existente
            if(await Usuario.findOne({where:{email}})) {
                return res.status(401).json({message:"Este email já está cadastrado."})
            }

            if(await Usuario.findOne({where:{nickname}})){
                return res.status(401).json({message:"Este nome de usuário já está cadastrado. Por favor, escolha outro!"})
            }
            //imagem padrão de usuario
            let imgPerfil = `../../images/covers/avatar.jpg`
            //criando usuario
            await Usuario.create({nome, nickname, img_perfil:imgPerfil, email, senha});

            //pegando o usuario criado
            let usuario = await Usuario.findOne({
                where:{
                    nickname:nickname
                },
                attributes:["id","nickname","img_perfil", "nome", "cep", "numero"]
            })

            req.session.idUsuario = usuario.id
            req.session.usuario = usuario

            return res.status(200).json({});
    },
    update: async(req, res) =>{
        
        let idUsuario = req.session.idUsuario;

        let { nickname, nome, cepUser, numeroCasa, emailUser } = req.body;
        let imgPerfil;

        if(req.file == undefined){
            imgPerfil = req.session.usuario.img_perfil;
          }else{
            imgPerfil = `../../images/covers/${req.file.filename}`;
          }

        numeroCasa == ""? numeroCasa = 0: numeroCasa = numeroCasa;

        await Usuario.update({
            nome,
            nickname,
            img_perfil: imgPerfil,
            email:emailUser,
            cep: cepUser,
            numero: numeroCasa
        },{
            where:{
                id: idUsuario
            }
        })

        req.session.usuario = await Usuario.findOne({
            where:{
                id: idUsuario
            },
            attributes:["id", "nome", "nickname", "email","img_perfil", "cep", "numero"]
        })

        res.redirect('/perfil');
    }
}