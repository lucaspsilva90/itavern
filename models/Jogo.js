'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jogo = sequelize.define('Jogo', {
    nome: DataTypes.STRING
  }, {
    tableName: 'jogos'
  });
  Jogo.associate = function(models) {
    Jogo.hasMany(models.Grupo, {
      foreignKey: 'id_jogo',
      as:'grupos'
    })
  };
  return Jogo;
};