/* eslint-disable new-cap */
const Sequelize = require('sequelize');

const {
  PRIVATE,
  PUBLIC,
  OPEN,
  CLOSE,
  WONT,
  LOW,
  MEDIUM,
  HIGH,
} = require('../constants/constant');
module.exports = function(sequelize) {
  const Tasks = sequelize.define(
      'Tasks',
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
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
        },
        status: {
          type: Sequelize.ENUM(OPEN, CLOSE, WONT),
          defaultValue: OPEN,
        },
        priority: {
          type: Sequelize.ENUM(LOW, MEDIUM, HIGH),
          defaultValue: LOW,
        },
        type: {
          type: Sequelize.ENUM(PRIVATE, PUBLIC),
          defaultValue: PRIVATE,
        },
        deadline_time: {
          type: Sequelize.DATE,
        },
        reminder_time: {
          type: Sequelize.DATE,
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
  Tasks.associate = (models) => {
    // Users
    Tasks.belongsTo(models.Users, {
      foreignKey: 'user_Id',
    });
    Tasks.belongsTo(models.Users, {
      foreignKey: 'created_by',
    });
    Tasks.belongsTo(models.Users, {
      foreignKey: 'updated_by',
    });
    Tasks.belongsTo(models.Users, {
      foreignKey: 'deleted_by',
    });
    // Comments
    Tasks.hasMany(models.Comments, {
      foreignKey: 'task_id',
    });
  };
  return Tasks;
  // console.log("This shows current table name",sequelize.models.Tasks)
};
