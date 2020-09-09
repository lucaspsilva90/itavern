'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios_grupos', {
      id_grupo:{
        type:Sequelize.INTEGER,
        allowNull: false
      },
      id_usuario:{
        type:Sequelize.INTEGER,
        allowNull: false
      },
      status:{
        type:Sequelize.STRING,
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
    return queryInterface.dropTable('usuarios_grupos');
  }
};