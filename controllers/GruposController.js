const gruposDB = require("../database/grupos.json");
const { Op } = require('sequelize');
const { Grupo, Jogo, UsuarioGrupo, Usuario } = require('../models');

// essa função traz todos os jogos do banco
function listaJogos(){
  return Jogo.findAll().then(
    data => {
        return data.map(u => u.toJSON())
    });
}
// essa função retorna os grupos que o usuario atual não esta
// e tambem retorna o numero de participantes desses grupos
async function gruposSemUsuarioAtual(id){
  let resul = await Grupo.findAll(
      {
          where:{
              id_admin:{
                  [Op.ne]:id
              }
          },
          include:[
              {
                  model:Jogo,
                  as:"jogoDoGrupo",
                  attributes:{
                      exclude:['createdAt','updatedAt']
                  }
              },
              {
                  model:Usuario,
                  as:"usuariosDoGrupo",
                  attributes:['id','nickname'],
              }
          ]
      }
  ).then(data => {
      return data.map( u => u.toJSON());
  });
  let filtrado = resul.map(grupo => grupo);
  let participantes = [];
  resul.map((grupo, index)=>{
      let contador = 0;
      grupo.usuariosDoGrupo.map(usuario =>{
          if(usuario.id == id && usuario.UsuarioGrupo.status == "aprovado"){
              return filtrado.splice(index, 1);
          }
          else if(usuario.UsuarioGrupo.status == "aprovado"){
            return contador++;
          }
      });
      participantes.push(contador);
  })

  let ceps = [];

  filtrado.forEach(grupo =>{
    ceps.push({
      logradouro: grupo.logradouro,
      numero: grupo.numero,
      id: grupo.id
    })
  })

  for(let x = 0; x < filtrado.length; x++){
    if(filtrado[x].numJogadores == participantes[x]){
      participantes.splice(x, 1);
      filtrado.splice(x,1)
    }
  }

  return {filtrado, participantes, ceps};
}
// essa função traz os grupos que um usuario está
function gruposUsuario(id){
  return Grupo.findAll({include:[
    {
        model:Jogo,
        as:"jogoDoGrupo",
    },
    {
      model:Usuario,
      as:"usuariosDoGrupo"
    }
],where:{id_admin:id}}).then(
        data => data.map( u => u.toJSON()))
}
//carrega as imagens com problema
function imgDoGrupo(id){
  Grupo.findByPk(id).then(resul=>{
    return resul.toJSON().img;
  })
}
//troca o formato da data pro formato americano
function arrumaDataDom(dataPt){
  let dia = dataPt.substr(0,2);
  let mes = dataPt[3] + dataPt[4];
  let ano = dataPt.substr(6);
  return `${ano}/${mes}/${dia}`;
}
//troca o formato da data pro formato Pt
function arrumaDataDb(dataUs){
  let dia = `0${dataUs.getDate()}`.length == 2? `0${dataUs.getDate()}`:`${dataUs.getDate()}`;
  let mes = `0${dataUs.getMonth() + 1}`.length == 2? `0${dataUs.getMonth() + 1}`:`${dataUs.getMonth() + 1}`;
  let ano = dataUs.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
//confere se o usuario já tem relação com um grupo
function verificaRelacao(idUsuario, idGrupo){
  return UsuarioGrupo.findOne({
    where:{
      id_grupo: idGrupo,
      id_usuario: idUsuario
    }
  }).then(resul=>{
    return resul == null? -1 : resul.toJSON();
  })
}

module.exports = {
  index: (req, res) => {
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;

    res.render("grupos", {
      nickname,
      imgPerfil,
      gruposDB
    });
  },
  teste: async (req,res) => {
    let meusGrupos = await gruposUsuario(6);
    for(grupo of meusGrupos){
     console.log(grupo.inicioReuniao.toString());
    }  
    res.send({message:"oi"});

  },
  store: async (req,res) => {
    let img = `../../images/covers/${req.file.filename}`;
    let id_jogo = req.body.nomeJogo
    let id_admin = req.session.idUsuario;

    let {nome,
         numJogadores,
         diasReuniao,
         horario,
         tempoJogo,
         inicioReuniao,
         cep,
         endereco,
         numero,
         descricao} = req.body
    
    diasReuniao = diasReuniao.toString();
    inicioReuniao = arrumaDataDom(inicioReuniao);
    let chat = [{"autor":"ciclano","mensagem":"Bom dia!","horaMsg":"12:00"}];

    await Grupo.create({id_jogo,
                        id_admin,
                        nome,
                        numJogadores,
                        diasReuniao,
                        horario,
                        tempoJogo,
                        inicioReuniao,
                        img,
                        descricao,
                        cep,
                        logradouro:endereco,
                        numero,
                        chat});
    let id_grupo = await Grupo.findOne({
      where:{
        nome: nome,
        id_jogo: id_jogo,
        id_admin: id_admin,
        inicioReuniao:inicioReuniao
      }
    }).then(grupo => grupo.toJSON());
    await UsuarioGrupo.create({
      id_grupo: id_grupo.id,
      id_usuario: id_admin,
      status: 'aprovado'
    })

    res.redirect('../home')
  },
  search: async (req, res) => {
    let jogos = await listaJogos();
    let { filtrado, participantes } = await gruposSemUsuarioAtual(req.session.idUsuario);
    let grupos = filtrado;
    let {
      searchText,
      groupGame,
      groupSize,
      distance
    } = req.query;
    
    if (searchText) {
      grupos = grupos.filter((grupo, index) => {
        let umNome = grupo.nome.toLowerCase();
        let pesquisado = searchText.toLowerCase().trim();
        if(umNome.includes(pesquisado)){
          return grupo;
        }
        else{
          participantes.splice(index, 1);
        }
      })
    }
    if(groupGame){
      grupos = grupos.filter((grupo, index) =>{
        if(grupo.jogoDoGrupo.id == groupGame){
          return grupo
        }
        else{
          participantes.splice(index, 1);
        }
      })
    }
    if(groupSize){
      switch(groupSize){
        case "1":
          grupos = grupos.filter((grupo,index) =>{
            if(grupo.numJogadores <= 5){
              return grupo;
            }
            else{
              participantes.splice(index, 1);
            }
          })
          break;
        case "2":
          grupos = grupos.filter((grupo, index) =>{
            if(grupo.numJogadores >= 5 && grupo.numJogadores <= 7){
              return grupo;
            }
            else{
              participantes.splice(index, 1);
            }
          })
          break;
        case "3":
          grupos = grupos.filter((grupo, index) =>{
            if(grupo.numJogadores >= 7){
              return grupo;
            }
            else{
              participantes.splice(index, 1);
            }
          })
          break;
      }
    }
    distance == undefined? distance = '': distance = distance;

    grupos.forEach(grupo => {
      grupo.inicioReuniao = arrumaDataDb(grupo.inicioReuniao)
      if(grupo.img == ""){
        grupo.img = "group-cover.jpg";
      }
    })
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;

    res.render("grupos-busca", {
      grupos,
      jogos,
      distance,
      participantes,
      nickname,
      imgPerfil
    });
  },
  showEdit: async (req, res) => {

    let idUsuario = req.session.idUsuario;
    let jogos = await listaJogos();
    // Conectar com o banco pra trazer as informações
    let meusGrupos = await gruposUsuario(idUsuario);
    let participantes = [];
    meusGrupos.forEach(grupo => {
      let contador = 0;
      if(grupo.img == ""){
        grupo.img = "/images/covers/group-cover.jpg";
      }
      grupo.usuariosDoGrupo.forEach(usuario =>{
        usuario.UsuarioGrupo.status == 'aprovado'? contador++ : usuario;
      })
      participantes.push(contador);
      grupo.inicioReuniao = arrumaDataDb(grupo.inicioReuniao);
    })


    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;

    res.render('editarGrupo', {meusGrupos, jogos, participantes, nickname, imgPerfil});
  },
  update: async (req, res) =>{
    let { id } = req.params;
    let img;
    if(req.file == undefined){
      img = await imgDoGrupo(id);
    }else{
      img = `../../images/covers/${req.file.filename}`;
    }
    let id_jogo = req.body.nomeJogo
    let {nome,
      numJogadores,
      diasReuniao,
      horario,
      tempoJogo,
      inicioReuniao,
      cep,
      endereco,
      numero,
      descricao} = req.body

      inicioReuniao = arrumaDataDom(inicioReuniao);

    await Grupo.update({
                        id_jogo,
                        nome,
                        numJogadores,
                        diasReuniao,
                        horario,
                        tempoJogo,
                        inicioReuniao,
                        img,
                        descricao,
                        cep,
                        logradouro:endereco,
                        numero
    },{
      where:{
        id:id
      }
    });
    res.redirect('../editarGrupos');
  },
  delete: async (req, res) =>{
    let { id } = req.body;


    await Grupo.destroy({where:{id:id}});
    await UsuarioGrupo.destroy({where:{id_grupo:id}});

    res.status(200).send();
  },
  addGrupo: async (req, res) =>{
    let { id } = req.body;
    let idUsuario = req.session.idUsuario;

    let relacao = await verificaRelacao(idUsuario, id);

    if(relacao != -1){
      let status = relacao.status
      switch(status){
        case 'aprovado':
          res.status(200).json({situacao:"Seu pedido já foi aceito"});
          break;
        case 'recusado':
          await UsuarioGrupo.update({
            status:'aguardando'
          },{
            where:{
              id_grupo: id,
              id_usuario: idUsuario,
            }
          })
          res.status(200).json({situacao:'Seu pedido foi enviado'})
          break;
        case 'aguardando':
          res.status(200).json({situacao:"Seu pedido já está em análise"});
          break;
        case 'saiu':
          await UsuarioGrupo.update({
            status:'aguardando'
          },{
            where:{
              id_grupo: id,
              id_usuario: idUsuario,
            }
          })
          res.status(200).json({situacao:'Seu pedido foi enviado'})
          break;
      }
    }
    else{
      console.log("else"); 
      await UsuarioGrupo.create({
        id_grupo: id,
        id_usuario: idUsuario,
        status: 'aguardando'
      })
      res.status(200).json({situacao:"Seu pedido foi enviado"});
    }
  },
  ceps: async (req, res) =>{
    let { ceps } = await gruposSemUsuarioAtual(req.session.idUsuario);

    let listaEnderecos = [];
    let endSemId = [];
    ceps.forEach((obj) =>{
        listaEnderecos.push({end:`${obj.logradouro} ${obj.numero}`, id:obj.id});
        endSemId.push(`${obj.logradouro} ${obj.numero}`);
    })

    res.status(200).json({listaEnderecos, endSemId});
  }
};