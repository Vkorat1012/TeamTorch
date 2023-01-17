/* eslint-disable max-len */
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        id: '1A',
        role_id: 1,
        first_name: 'vaibhav',
        last_name: 'korat',
        email: 'vaibhav@gmail.com',
        password: '$2a$10$ooSyYOWf08PDr63K1.JrQe9HO90VyUT2nz.qb5pLPApgxcEqrfyXK',
        contact_number: '+91 72840 42305',
      },
      {
        id: '1B',
        role_id: 2,
        first_name: 'Tom',
        last_name: 'Cruise',
        email: 'tom@gmail.com',
        password: '$2a$10$ooSyYOWf08PDr63K1.JrQe9HO90VyUT2nz.qb5pLPApgxcEqrfyXK',
        contact_number: '+91 79845 13245',
      },
      {
        id: '1C',
        role_id: 2,
        first_name: 'kishan',
        last_name: 'patel',
        email: 'kishan@gmail.com',
        password: '$2a$10$ooSyYOWf08PDr63K1.JrQe9HO90VyUT2nz.qb5pLPApgxcEqrfyXK',
        contact_number: '+91 79878 42305',
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
