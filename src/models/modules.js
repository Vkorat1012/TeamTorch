/* eslint-disable new-cap */
const Sequelize = require('sequelize');
const {ACTIVE, DEACTIVE} = require('../constants/constant');
module.exports = function(sequelize) {
  const Modules = sequelize.define(
      'Modules',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
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
          type: Sequelize.ENUM(ACTIVE, DEACTIVE),
        },
        updated_by: {
          type: Sequelize.UUID,
        },
        created_at: {
          type: 'TIMESTAMP',
        },
        updated_at: {
          type: 'TIMESTAMP',
        },
      },
      {
        freezeTableName: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      },
  );
  Modules.associate = (models) => {
    // For Roles
    Modules.belongsTo(models.Users, {
      foreignKey: 'updated_by',
    });
    Modules.hasMany(models.Notifications, {
      foreignKey: 'module_id',
    });
    Modules.hasMany(models.Activity_logs, {
      foreignKey: 'module_id',
    });
  };

  return Modules;
};

// console.log("This shows current table name",sequelize.models.Modules)
