/* eslint-disable new-cap */
const {ACTIVE, DEACTIVE} = require('../constants/constant');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
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
            references: {
              model: 'Roles',
              key: 'id',
            },
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
            email: true,
            allowNull: false,
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
            references: {
              model: 'Users',
              key: 'id',
              allowNull: true,
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
          last_login: {
            type: Sequelize.DATE,
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
        },
        {
          paranoid: true,
        },
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
