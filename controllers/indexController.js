// const gruposDB = require("../database/grupos.json");

const { Jogo, Usuario, Grupo, UsuarioGrupo } = require('../models');

//
function gruposDoUsuario(id){
  return UsuarioGrupo.findAll({
    where:{
      id_usuario:id,
      status:'aprovado'
    },
    include:[
      {
        model:Grupo,
        as:"dadosDosGrupo",
        include:[
          {
            model: Jogo,
            as: 'jogoDoGrupo'
          },{
            model: Usuario,
            as: 'usuariosDoGrupo'
          }
        ]
      }
    ]
  }).then(data => {
    return data.map(u => u.toJSON().dadosDosGrupo);
    }
)
}
function listaJogos(){
  return Jogo.findAll().then(
    data => {
        return data.map(u => u.toJSON())
    });
}
function infoGrupo(id){
  return UsuarioGrupo.findAll(
    {
      where:{
        id_grupo:id,
        status:"aprovado"
      },
      include:
        [
          {
            model: Usuario,
            as: "dadosDosUsuario",
            attributes:["id", "nickname", "img_perfil"]
          },
          {
            model:Grupo,
            as:"dadosDosGrupo",
            attributes:["id","id_admin","nome", "inicioReuniao", "cep","id_jogo", "descricao", "numero"]
          }
        ]
    }).then(data =>{
    return data.map(u =>{
      return{
        dadosDosUsuario:u.toJSON().dadosDosUsuario,
        dadosDosGrupo:u.toJSON().dadosDosGrupo,
      }
    });
  })
}
function arrumaDataDb(dataUs){
  let dia = `0${dataUs.getDate()}`.length == 2? `0${dataUs.getDate()}`:`${dataUs.getDate()}`;
  let mes = `0${dataUs.getMonth() + 1}`.length == 2? `0${dataUs.getMonth() + 1}`:`${dataUs.getMonth() + 1}`;
  let ano = dataUs.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
// dados notificacao
function verificaPedidos (id){
  return UsuarioGrupo.findAll({
    where:{
      id_grupo: id,
      status: 'aguardando'
    },
    include:[
      {
        model:Usuario,
        as: 'dadosDosUsuario'
      }
    ]
  }).then(resul =>{
    return resul.map(u => u.toJSON());
  })
}

function buscaGrupo (id){
  return Grupo.findByPk(id,{
    attributes:["id","nome"]
  })
}

module.exports = {
  index: (req, res) => {
    !req.session.token?
      res.render("index",{email:""})
    :
      res.render('index',{email:req.session.token.email})
  },
  home: async (req, res) => {
    let jogos = await listaJogos();
    let id = req.session.idUsuario;
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;
    let gruposDB = await gruposDoUsuario(id);
    let participantes = [];
    gruposDB.forEach(grupo => 
      {
        let contador = 0;
        grupo.inicioReuniao = arrumaDataDb(grupo.inicioReuniao);
        if(grupo.img == ""){
          grupo.img = "group-cover.jpg";
        }
        grupo.usuariosDoGrupo.forEach(usuario =>{
          usuario.UsuarioGrupo.status == 'aprovado'? contador++ : usuario;
        })
        participantes.push(contador);
      });


    res.render("home", {
      gruposDB,
      jogos,
      participantes,
      nickname,
      imgPerfil
    });
  },
  perfil: async (req, res) => {
    let jogos = await listaJogos();
    let { usuario } = req.session;
    usuario.numero == 0? usuario.numero = "" : usuario.numero = usuario.numero;
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;
    res.render("editar-perfil", {jogos, usuario, nickname, imgPerfil});
  },
  chat: async (req,res) =>{
    // let gruposDB = gruposDoUsuario(1)
    let grupo = await buscaGrupo(req.params.id);
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;
    let jogos = await listaJogos();

    res.render("grupos",{
      grupo,
      jogos,
      nickname,
      imgPerfil
    })
  },
  sair: (req, res) =>{
    req.session.usuario = undefined;
    req.session.idUsuario = undefined;
    res.redirect("/sair");
  },
  info: async (req, res) =>{
    let id = req.params.id;
    let infGrupo = await infoGrupo(id);
    let usuariosDoGrupo = infGrupo.map(obj => obj.dadosDosUsuario);
    infGrupo = infGrupo[0].dadosDosGrupo;
    infGrupo.usuariosDoGrupo = usuariosDoGrupo;
    infGrupo.idLogado = req.session.idUsuario;
    infGrupo.inicioReuniao = arrumaDataDb(infGrupo.inicioReuniao);
    res.status(200).json({infGrupo});
  },
  pedidos: async (req, res) =>{
    let id = req.params.id;
    let pedidos = await verificaPedidos(id);

    pedidos = pedidos.map(pedido =>{
      return {
        id_usuario:pedido.id_usuario,
        nickname: pedido.dadosDosUsuario.nickname
      }
    })

    res.status(200).json({pedidos});
  },
  mudaStatus: async (req, res) =>{
    let { novoStatus, idGrupo, idCandidato } = req.body;
    await UsuarioGrupo.update({
      status:novoStatus
    },{
      where:{
        id_grupo: idGrupo,
        id_usuario: idCandidato
      }
    })

    res.status(200).json({resposta:`Usuário ${novoStatus}.`})
  },
  tiraDoGrupo: async (req, res)=>{
    let { id  }= req.body;
    let idUsuario = req.session.idUsuario;

    await UsuarioGrupo.update({
      status:"saiu",
    },{
      where:{
        id_grupo:id,
        id_usuario:idUsuario
      }
    })
    res.status(200).json({situacao:"Saiu do grupo"});
  },
  searchChat: async (req, res) =>{
    let objComArray = await Grupo.findByPk(req.params.id,{
      attributes:["chat"]
    })

    let mensagens = objComArray.chat;
    
    res.status(200).json({mensagens});

  }
};