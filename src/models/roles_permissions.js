/* eslint-disable camelcase */
const Sequelize = require('sequelize');
module.exports = function(sequelize) {
  const Roles_permissions = sequelize.define(
      'Roles_permissions',
      {
        role_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        permission_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      },
  );

  return Roles_permissions;
};

