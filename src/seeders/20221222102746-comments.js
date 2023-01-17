/* eslint-disable max-len */
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Comments', [
      {
        id: '1',
        task_id: '1',
        title: 'Login Page Valiadtion (joi libarary)',
        description: 'please suggest between Joi and Express validator , which should I use',
        created_by: '1A',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Comments', null, {}),
};
