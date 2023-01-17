module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Roles', [
      {
        name: 'Super Admin',
        slug: 'super_admin',
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'User',
        slug: 'user',
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
