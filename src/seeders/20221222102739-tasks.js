module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Tasks', [
      {
        id: '1',
        user_id: '1A',
        title: 'Login Page Valiadtion',
        description: 'You can use any library for validation',
        status: 'Open',
        priority: 'low',
        type: 'private',
        created_by: '1A',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Tasks', null, {}),
};
