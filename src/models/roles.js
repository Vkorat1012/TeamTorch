/* eslint-disable new-cap */
const Sequelize = require('sequelize');
const {active, deactive} = require('../constants/constant');

module.exports = function(sequelize) {
  const Roles = sequelize.define(
      'Roles',
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(active, deactive),
          allowNull: false,
        },
      // created_by: {
      //   type: Sequelize.UUID,
      //   allowNull:false
      // },
      // updated_by: {
      //   type: Sequelize.UUID,
      // },
      // deleted_by: {
      //   type: Sequelize.UUID,
      // },
      // created_at: {
      //   type: "TIMESTAMP",
      //   allowNull: false,
      // },
      // updated_at: {
      //   type: "TIMESTAMP",
      //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      // },
      // deleted_at: {
      //   type: Sequelize.DATE,
      // },
      },
      {
        freezeTableName: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      },
  );
  Roles.associate = (models) => {
    Roles.hasMany(models.Users, {
      foreignKey: 'role_id',
    });

    // Permissions
    Roles.belongsToMany(models.Permissions, {
      through: 'Roles_permissions',
      foreignKey: 'role_id',
    });
  };
  return Roles;
};

// console.log("This shows current table name",sequelize.models.Roles)
