/* eslint-disable max-len */
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Notifications', [
      {
        id: 1,
        user_id: '1A',
        module_id: 1,
        title: 'Login Page Valiadtion (joi libarary)',
        description: 'please use joi, it has good community support and easy to use and maintain',
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Notifications', null, {}),
};
