const { sequelize, Jogo } = require('../models');

/* PEGANDO SÓ OS JOGOS */
Jogo.findAll().then(
    data => {
        console.log(data.map(u => u.toJSON()));
        sequelize.close();
    }
)

/* PEGANDO OS JOGOS COM OS GRUPOS QUE JOGAM */
// Jogo.findAll({include:['grupos']}).then(
//     data => {
//         data.map( u => {
//             let item = u.toJSON();
//             console.log(item);
//         });
//         sequelize.close();
//     }
// )
