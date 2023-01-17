const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Comments = sequelize.define(
      'Comments',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
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
  Comments.associate = (models) => {
    // tasks
    Comments.belongsTo(models.Tasks, {
      foreignKey: 'task_Id',
    });
    // Users
    Comments.belongsTo(models.Users, {
      foreignKey: 'created_by',
    });
    Comments.belongsTo(models.Users, {
      foreignKey: 'updated_by',
    });
    Comments.belongsTo(models.Users, {
      foreignKey: 'deleted_by',
    });
  };
  return Comments;
};

// console.log("This shows current table name",sequelize.models.Comments)
