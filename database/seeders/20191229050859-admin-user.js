'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('User', [
      {
        nickname: 'angle',
        faceImg:
          'https://avatars3.githubusercontent.com/u/25807379?s=400&u=853d7a00edfee4bfb9aa46735b9e75020869965c&v=4',
        isAdmin: true,
        createDate: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
