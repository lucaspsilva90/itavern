const { sequelize, Grupo, Jogo, Usuario } = require('../models');
const { Op } = require('sequelize');
/* PEGANDO SÓ O GRUPO */
// Grupo.findAll().then(
//     data => {
//         data.map( u => {
//             let item = u.toJSON();
//             console.log(item);
//         });
//         sequelize.close();
//     }
// )


/* PEGANDO O GRUPO COM OS USUARIOS DO GRUPO */
// Grupo.findAll({include:[
//         {
//         model:Usuario,
//         as:"usuariosDoGrupo",
//     }
// ]}).then(
//     data => {
//         data.map( u => {
//             let item = u.toJSON();
//             console.log(item);
//         });
//     }
// )


/* PEGANDO O GRUPO COM O SEU JOGO */
// Grupo.findAll({include:[
//     {
//         model:Jogo,
//         as:"jogoDoGrupo",
//     }
// ]}).then(
//         data => {
//             let listaGrupos = data.map( u => {
//                 return u.toJSON();
//             });
//             console.log(listaGrupos);
//             return listaGrupos;
//         }
// )

async function teste(id){
    let resul = await Grupo.findAll(
        {
            where:{
                id_admin:{
                    [Op.ne]:id
                }
            },
            attributes:['id','id_admin','nome'],
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
    resul.map((grupo, index)=>{
        grupo.usuariosDoGrupo.map(usuario =>{
            if(usuario.id == id && usuario.UsuarioGrupo.status == "aprovado"){
                filtrado.splice(index, 1);
            }
        });
    })
    return filtrado;
}

teste();