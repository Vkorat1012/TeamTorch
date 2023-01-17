module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('roles_permissions', [
      {
        role_id: 1,
        permission_id: 1,
      },
      {
        role_id: 1,
        permission_id: 2,
      },
      {
        role_id: 1,
        permission_id: 3,
      },
      {
        role_id: 1,
        permission_id: 4,
      },
      {
        role_id: 2,
        permission_id: 1,
      },
      {
        role_id: 2,
        permission_id: 3,
      },
    ]),
  down: (queryInterface) =>
    queryInterface.bulkDelete('roles_permissions', null, {}),
};
