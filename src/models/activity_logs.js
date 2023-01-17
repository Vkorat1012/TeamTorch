/* eslint-disable camelcase */
const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const Activity_logs = sequelize.define(
      'Activity_logs',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        module_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        action: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        previous_log: {
          type: Sequelize.TEXT,
        },
        updated_log: {
          type: Sequelize.TEXT,
          allowNull: false,
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
  Activity_logs.associate = (models) => {
    // For Users
    Activity_logs.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
    Activity_logs.belongsTo(models.Users, {
      foreignKey: 'module_id',
    });
    Activity_logs.belongsTo(models.Users, {
      foreignKey: 'updated_by',
    });
  };

  return Activity_logs;
};
