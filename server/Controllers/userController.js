const { comparePassword } = require("../helpers/bcrypt");
const { User } = require("../models");

module.exports = {
  async register(req, res, next) {
    try {
      const { fullName, username, email, password } = req.body;
      const user = await User.create({ fullName, username, email, password });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidEmailPassword" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "InvalidEmailPassword" };
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "UserNotFound" };
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { fullName, username, email, password } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "UserNotFound" };
      }
      await user.update({ fullName, username, email, password });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "UserNotFound" };
      }
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
