/* eslint-disable new-cap */
const Sequelize = require('sequelize');
const {ACTIVE, DEACTIVE} = require('../constants/constant');

module.exports = function(sequelize) {
  const Users = sequelize.define(
      'Users',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        role_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          email: true,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        contact_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(ACTIVE, DEACTIVE),
          defaultValue: ACTIVE,
        },
        created_by: {
          type: Sequelize.UUID,
        },
        updated_by: {
          type: Sequelize.UUID,
        },
        deleted_by: {
          type: Sequelize.UUID,
        },
        last_login: {
          type: Sequelize.DATE,
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
  Users.associate = (models) => {
    // Self join
    Users.belongsTo(Users, {foreignKey: 'id', as: 'Id'});

    // For Roles
    Users.belongsTo(models.Roles, {
      foreignKey: 'role_id',
    });

    // For Task
    Users.hasMany(models.Tasks, {
      foreignKey: 'user_id',
    });
    Users.hasMany(models.Tasks, {
      foreignKey: 'created_by',
    });
    Users.hasMany(models.Tasks, {
      foreignKey: 'updated_by',
    });
    Users.hasMany(models.Tasks, {
      foreignKey: 'deleted_by',
    });

    // Comments
    Users.hasMany(models.Comments, {
      foreignKey: 'created_by',
    });
    Users.hasMany(models.Comments, {
      foreignKey: 'updated_by',
    });
    Users.hasMany(models.Comments, {
      foreignKey: 'deleted_by',
    });

    // Notifications
    Users.hasMany(models.Notifications, {
      foreignKey: 'user_id',
    });

    // Permissions
    // Users.hasMany(models.Permissions, {
    //   foreignKey: "updated_by",
    // });

    // Modules
    Users.hasMany(models.Modules, {
      foreignKey: 'updated_by',
    });

    // Activity logs
    Users.hasMany(models.Activity_logs, {
      foreignKey: 'user_id',
    });
    Users.hasMany(models.Activity_logs, {
      foreignKey: 'updated_by',
    });

    // White_listed_ips
    Users.hasMany(models.White_listed_ip, {
      foreignKey: 'created_by',
    });
    Users.hasMany(models.White_listed_ip, {
      foreignKey: 'updated_by',
    });
    Users.hasMany(models.White_listed_ip, {
      foreignKey: 'deleted_by',
    });
  };

  return Users;
};
