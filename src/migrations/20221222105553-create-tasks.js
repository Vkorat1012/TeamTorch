/* eslint-disable new-cap */
const {
  PRIVATE_TASK,
  PUBLIC_TASK,
  OPEN,
  CLOSE,
  WONT,
  LOW,
  MEDIUM,
  HIGH,
} = require('../constants/constant');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
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
        type: Sequelize.ENUM(PRIVATE_TASK, PUBLIC_TASK),
        defaultValue: PRIVATE_TASK,
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
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      deleted_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('tasks');
  },
};
