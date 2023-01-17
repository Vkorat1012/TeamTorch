module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Modules', [
      {
        id: '1',
        name: 'Dashboard',
        slug: 'dashboard',
        status: 'Active',
      },
      {
        id: '2',
        name: 'Task',
        slug: 'task',
        status: 'Deactive',
      },
      {
        id: '3',
        name: 'Role',
        slug: 'role',
        status: 'Active',
      },
      {
        id: '4',
        name: 'User',
        slug: 'user',
        status: 'Active',
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Modules', null, {}),
};
