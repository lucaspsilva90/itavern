const { sequelize, UsuarioGrupo, Usuario, Grupo, Jogo } = require('../models');
const { Op } = require('sequelize');

/* TESTE TRAZENDO SÓ A TABELA */
// UsuarioGrupo.findAll().then(
//         data => {
//             console.log(data.map(u => u.toJSON()));
//             sequelize.close();
//         }
// )

/* TRAZENDO UM GRUPO COM AS INFORMAÇÕES DO USUARIO */
// UsuarioGrupo.findAll({include:[
//     {
//         model:Usuario,
//         as:"dadosDosUsuario",
//     }
// ]}).then(
//         data => {
//             data.map( u => {
//                 let item = u.toJSON();
//                 console.log(item);
//             });
//             sequelize.close();
//         }
// )


/* TRAZENDO UM GRUPO E SUAS INFORMAÇÕES */
// UsuarioGrupo.findAll({include:[
//     {
//         model:Grupo,
//         as:"dadosDosGrupos",
//     }
// ]}).then(
//         data => {
//             data.map( u => {
//                 let item = u.toJSON();
//                 console.log(item);
//             });
//             sequelize.close();
//         }
// )

// TRAZ OS GRUPOS QUE O USUARIO NÂO ESTÁ
// UsuarioGrupo.findAll({
//     where:{
//         id_usuario:{
//             [Op.ne]: 6
//         }
//     },
//     include:[
//         {
//             model: Grupo,
//             as: 'dadosDosGrupo'
//         }
//     ]
// }).then(
//         data => {
//             data.map( u => {
//                 let item = u.toJSON();
//                 console.log(item);
//             });
//         }
// )

/* TRAZENDO UM GRUPO E OS USUARIO COM SUAS INFORMAÇÕES */
// UsuarioGrupo.findAll({include:[
//     {
//         model:Grupo,
//         as:'dadosDosGrupo'
//     },
//     {
//         model:Usuario,
//         as:'dadosDosUsuario'
//     }
// ]}).then(
//         data => {
//             data.map( u => {
//                 let item = u.toJSON();
//                 console.log(item);
//             });
//             sequelize.close();
//         }
// )

// PEGA OS USUARIOS COM UMA DETERMINADA CONDIÇÃO
// UsuarioGrupo.findAll({
//     where:{
//       id_grupo: 1,
//       status: 'aprovado'
//     },
//     include:[
//       {
//         model:Usuario,
//         as: 'dadosDosUsuario'
//       }
//     ]
//   }).then(resul =>{
//     resul.map( u =>{
//         let item = u.toJSON();
//         console.log(item);
//     })
//   })

UsuarioGrupo.findAll(
    {
        attributes:{
            exclude:['createdAt','updatedAt']
        },
        include:{
            model:Grupo,
            as:"dadosDosGrupo",
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            include:{
                model:Jogo,
                as:"jogoDoGrupo",
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
            }
        },
        where:{
            id_usuario:{
                [Op.ne]:2
            }
        },
    }
).then(data => {
    console.log(data.map( u => u.toJSON()));
});