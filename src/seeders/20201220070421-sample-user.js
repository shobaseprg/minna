'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Taro',
        pass: 'lkfjaluadf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hanako',
        pass: 'fdakljfa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
