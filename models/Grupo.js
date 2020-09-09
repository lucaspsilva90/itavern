'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
    id_admin:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome:{
      type:DataTypes.STRING,
      allowNull: false
    }, 
    numJogadores:{
      type:DataTypes.NUMBER,
      allowNull: false
    },
    diasReuniao:{
      type:DataTypes.STRING,
      allowNull: false
    },
    horario:{
      type:DataTypes.STRING,
      allowNull: false
    },
    tempoJogo:{
      type:DataTypes.STRING,
      allowNull: false
    },
    inicioReuniao: {
      type:DataTypes.DATE,
      allowNull: false
    },
    img: DataTypes.STRING,
    descricao: DataTypes.STRING,
    cep: {
      type:DataTypes.STRING,
      allowNull:false
    },
    logradouro:{
      type: DataTypes.STRING,
      allowNull:false
    },
    numero: DataTypes.NUMBER,
    chat:{
      type: DataTypes.JSON,
      allowNull:false
    }
  }, {
    tableName: 'grupos'
  });
  Grupo.associate = (models) => {
    Grupo.belongsTo(models.Jogo,{
      foreignKey: 'id_jogo',
      as:'jogoDoGrupo'
    })
    Grupo.belongsToMany(models.Usuario, {
      foreignKey: 'id_grupo',
      as:"usuariosDoGrupo",
      through: models.UsuarioGrupo
    });
  };
  return Grupo;
};