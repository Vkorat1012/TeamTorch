
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles_permissions', {
      role_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      permission_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'permissions',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Roles_permissions');
  },
};
