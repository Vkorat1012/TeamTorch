module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Permissions', [
      {
        module_id: 2,
        name: 'View Task',
        slug: 'task_view',
        created_at: new Date(),
        updated_at: new Date(),

      }, {
        module_id: 2,
        name: 'Edit Task',
        slug: 'task_edit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_id: 2,
        name: 'Add comments',
        slug: 'task_add_comments',
        created_at: new Date(),
        updated_at: new Date(),

      }, {
        module_id: 2,
        name: 'Delete Task',
        slug: 'task_delete',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Permissions', null, {}),
};
