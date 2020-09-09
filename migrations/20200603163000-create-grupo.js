'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grupos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_jogo:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_admin:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull:false
      },
      numJogadores: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      diasReuniao: {
        type: Sequelize.STRING,
        allowNull:false
      },
      horario:{
        type:Sequelize.STRING,
        allowNull:false
      },
      tempoJogo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      inicioReuniao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING,
        allowNull:false
      },
      logradouro:{
        type: Sequelize.STRING,
        allowNull: false
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      chat:{
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('grupos');
  }
};