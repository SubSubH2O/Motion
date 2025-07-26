const pool = require("../config/database");

class User {
    constructor({ user_id = null, username, email, password }) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    // edit profile //TODO: dont know if this edit profile should take a user object or just the data
    editProfile(user) {

    }

    // check password
    checkPassword(inputPassword) {
        return bcrypt.compare(inputPassword, this.Password)
    }

    // find user by email
    static async findUserByEmail(email) {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0] ? new User(result.rows[0]) : null;
    }

    // find user by username
    static async findUserByUsername(username) {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        return result.rows[0] ? new User(result.rows[0]) : null;
    }

    // create new user
    static async insertNewUser({ username, email, password }) {
        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, password]
        );
        return new User(result.rows[0]);
    }


    // add friend

    // request to be friend
}

module.exports = User;