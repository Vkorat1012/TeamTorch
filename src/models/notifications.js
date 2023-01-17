/* eslint-disable new-cap */
const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const Notifications = sequelize.define(
      'Notifications',
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
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        is_read: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        created_at: {
          type: Sequelize.DATE(),
        },
      },
      {
      // timestamps: false,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
        // deletedAt : false

      },
  );
  Notifications.associate = (models) => {
    // Users
    Notifications.belongsTo(models.Users, {
      foreignKey: 'user_Id',
    });
    Notifications.belongsTo(models.Modules, {
      foreignKey: 'module_id',
    });
  };
  return Notifications;
  // console.log("This shows current table name",sequelize.models.Notifications)
};
