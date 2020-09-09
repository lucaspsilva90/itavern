'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('usuarios', [
        {
          nome: 'Lucas Silva',
          nickname: 'lps',
          img_perfil:"../../images/covers/avatar.jpg",
          email: 'lucas@lucas.com',
          senha: bcrypt.hashSync('123456',10),
          cep: "05343-010",
          numero: 123,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Iriss Queiroz',
          nickname: 'irissquei',
          img_perfil:"../../images/covers/avatar.jpg",
          email: 'iriss@iriss.com',
          senha: bcrypt.hashSync('123456',10),
          cep: "05337-020",
          numero: 312,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Fabiano Capadocia',
          nickname: 'fabcap',
          img_perfil:"../../images/covers/avatar.jpg",
          email: 'fabiano@fabiano.com',
          senha: bcrypt.hashSync('123456',10),
          cep: "06020-060",
          numero: 456,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Sandra Jorge',
          nickname: 'sdj',
          img_perfil:"../../images/covers/avatar.jpg",
          email: 'sandra@sandra.com',
          senha: bcrypt.hashSync('123456',10),
          cep: "05353-110",
          numero: 789,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Alfredo Laurel',
          nickname: 'alr',
          img_perfil:"../../images/covers/dragknight.jpg",
          email: 'alfredo@alfredo.com',
          senha: bcrypt.hashSync('123456',10),
          cep: "05361-050",
          numero: 52,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('usuarios', null, {});

  }
};
