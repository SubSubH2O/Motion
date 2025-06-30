const jwt = require("jsonwebtoken");

// generate jwt token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

// register user
exports.registerUser = async (req, res) => {};

// login user
exports.loginUser = async (req, res) => {};

// get user ingo
exports.getUserInfo = async (req, res) => {};