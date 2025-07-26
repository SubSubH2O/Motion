const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const User = require("../models/User");

// register user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
            return res.status(401).json("User already exist");
        }

        // Hash the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        // Insert new user and get the full user object (with user_id)
        const newUser = await User.insertNewUser({ username, email, password: bcryptPassword });
        // Generate JWT token with the new user's user_id
        const token = jwtGenerator(newUser.user_id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// login user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username)
        console.log
        const user = await User.findUserByUsername(username);
        if (!user) {
            return res.status(401).send("User is not registered");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send("Password or Username is incorrect");
        }
        const token = jwtGenerator(user.user_id);
        res.json({ token });
        console.log("got it")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// authorize user
exports.authorize = async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
};

