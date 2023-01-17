const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Permissions = sequelize.define(
      'Permissions',
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        module_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
      // updated_by: {
      //   type: Sequelize.UUID,
      // },
      },
      {
        freezeTableName: true,
        paranoid: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        deletedAt: 'deleted_at',
      },
  );
  Permissions.associate = (models) => {
    Permissions.belongsToMany(models.Roles, {
      through: 'Roles_permissions',
      foreignKey: 'permission_id',
    });
    // modules
    Permissions.belongsTo(models.Modules, {
      foreignKey: 'module_Id',
    });
    // Permissions.belongsTo(models.Users, {
    //   foreignKey: "updated_by",
    // });
  };
  return Permissions;
};

// console.log("This shows current table name",sequelize.models.Permissions)
