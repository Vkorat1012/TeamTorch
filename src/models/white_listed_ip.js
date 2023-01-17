/* eslint-disable new-cap */
/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const {ACTIVE, DEACTIVE} = require('../constants/constant');
module.exports = function(sequelize) {
  const White_listed_ip = sequelize.define(
      'White_listed_ip',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        tag: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ip: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        status: {
          type: Sequelize.ENUM(ACTIVE, DEACTIVE),
          defaultValue: ACTIVE,
        },
        created_by: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.UUID,
        },
        deleted_by: {
          type: Sequelize.UUID,
        },
      },
      {
        freezeTableName: true,
        paranoid: true,
        deletedAt: 'deleted_at',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
      },
  );
  White_listed_ip.associate = (models) => {
    White_listed_ip.belongsTo(models.Users, {
      foreignKey: 'created_by',
    });
    White_listed_ip.belongsTo(models.Users, {
      foreignKey: 'updated_by',
    });
    White_listed_ip.belongsTo(models.Users, {
      foreignKey: 'deleted_by',
    });
  };
  return White_listed_ip;
};

// console.log("This shows current table name",sequelize.models.White_listed_ip)
