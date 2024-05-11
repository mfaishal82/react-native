"use strict";

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "admin",
        username: "admin",
        email: "admin@mail.com",
        password: hashPassword("12345"), // use hashPassword from helpers/bcrypt.js
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "user",
        username: "user",
        email: "user@mail.com",
        password: hashPassword("12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
