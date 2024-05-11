const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function isAdmin(req, res, next) {
  try {
    // console.log(req.headers)
    let accessToken = req.headers.authorization;
    if (!accessToken) {
      throw { name: "Unauthenticated" };
    }

    let [type, token] = accessToken.split(" ");
    if (type !== "Bearer") {
      throw { name: "Unauthenticated" };
    }

    let payload = verifyToken(token);
    // console.log(payload)

    let user = await User.findByPk(payload.id);
    // console.log(user)

    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    // console.log(error)
    next(error);
  }
}

export default isAdmin;
