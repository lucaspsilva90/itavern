const { sequelize, Usuario, Grupo } = require('../models');
const { Op } = require('sequelize');
/* PEGANDO TODOS OS USUARIOS */
// Usuario.findAll().then(
//         data => {
//             console.log(data.map(u => u.toJSON()));
//             sequelize.close();
//         }
// )

/* PEGANDO OS USUARIOS COM OS GRUPOS QUE PERTENCEM*/
// Usuario.findAll({include:[
//     {
//         model:Grupo,
//         as:"gruposDoUsuario"
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

// uma query pra trazer os grupos que
// o usuario logado pertence
//req.session.idUsuario
// Usuario.findByPk(1,{include:[
//     {
//         model:Grupo,
//         as:"gruposDoUsuario"
//     }
// ]}).then(data => {
//     console.log(data.toJSON().gruposDoUsuario);
//         }
// )

async function testando(){
    let teste = await Usuario.findAll(
        {
            include:{
                model:Grupo,
                as:"gruposDoUsuario",
                where:{
                    id_admin:{
                        [Op.ne]:2
                    }
                },
                attributes:["id", "id_admin","nome"]
            },
            attributes:["id","nickname"],
            where:{
                id:{
                    [Op.ne]:2
                }
            }
        }
    ).then(data => {
        let resul = data.map( u => u.toJSON());
        console.log(resul);
        return resul;
    });
    
    teste.forEach(user =>{
        user.gruposDoUsuario.forEach(grupo =>{
            console.log(grupo);
        })
    })
}

testando();