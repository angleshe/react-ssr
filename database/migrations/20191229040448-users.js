'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'uid'
      },
      nickname: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: '昵称'
      },
      faceImg: {
        type: Sequelize.STRING,
        comment: '头像'
      },
      createDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: '创建日期'
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为管理员'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('User');
  }
};
