const router = require("express").Router();
const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

// register
router.post("/register", validInfo, async (req, res) => {
    try {
        // destructure the req.body
        const {username, email, password} = req.body;
        // check if user exist
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if(user.rows.length !== 0) {
            return res.status(401).send("User already exist")
        }

        // bcrypt the passwrord
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // enter the new user into the database
        const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, bcryptPassword]);

        // generating the jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// login
router.post("/login", validInfo, async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if(user.rows.length === 0) {
            return res.status(401).send("User is not registered")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) {
            return res.status(401).send("Password or Username is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
})

module.exports = router;