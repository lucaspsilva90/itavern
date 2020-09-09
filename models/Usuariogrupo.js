'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsuarioGrupo = sequelize.define('UsuarioGrupo', {
    id_usuario:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      references:{
          model: "Usuario",
          key: "id"
      }
  },
  id_grupo:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      references:{
          model: "Grupo",
          key: "id"
      }
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false
  }
  }, {
    tableName: 'usuarios_grupos'
  });
  UsuarioGrupo.associate = function(models) {
    UsuarioGrupo.belongsTo(models.Grupo, {
      foreignKey: 'id_grupo',
      as: 'dadosDosGrupo'
    })
    UsuarioGrupo.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      as:'dadosDosUsuario'
    })
  };
  return UsuarioGrupo;
};