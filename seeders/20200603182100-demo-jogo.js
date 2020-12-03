'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('jogos', [
        {
          nome: 'Dungeons & Dragons',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Pathfinder',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Call of Cthulhu',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Tormenta',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'GURPS',
          createdAt: new Date(),
          updatedAt: new Date()
        }
  
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('jogos', null, {});

  }
};
