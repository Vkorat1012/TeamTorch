/* eslint-disable max-len */
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('White_listed_ip', [
      {
        id: 1,
        tag: 'Giriraj Office',
        ip: '172.16.256.1',
        created_by: '1A',
      },
      {
        id: 2,
        tag: 'vaibhav ',
        ip: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        created_by: '1A',
      },

    ]),
  down: (queryInterface) => queryInterface.bulkDelete('White_listed_ip', null, {}),
};
