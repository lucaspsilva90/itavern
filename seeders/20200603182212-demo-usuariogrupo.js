'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('usuarios_grupos', [
        {
          id_grupo: 1,
          id_usuario: 1,
          status: "aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 2,
          status:"aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 3,
          status: "aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 4,
          status: "aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 5,
          status: "aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 2,
          id_usuario: 2,
          status: "aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 3,
          id_usuario: 3,
          status: "aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 4,
          id_usuario: 5,
          status: "aprovado",
          createdAt: new Date,
          updatedAt: new Date
        },

      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('usuarios_grupos', null, {});
  }
};
