const pool = require("../config/database");

class Group {
    constructor({group_id = null, owner_id, code = null}) {
        this.group_id = group_id;
        this.owner_id = owner_id;
        this.code = code;
    }

    // create a group
    static async createGroup(owner_id) {
        const code = await this.generateCode();
        const result = await pool.query("INSERT INTO groups (owner_id, code) VALUES ($1, $2) RETURNING *", [owner_id, code])
        return result.rows[0] ? new Group(result.rows[0]) : null;
    }

    // get a group by code
    static async getGroupByCode(code) {
        const result = await pool.query("SELECT * FROM groups WHERE code = $1", [code])
        return result.rows[0] ? new Group(result.rows[0]) : null;
    }

    // get all groups by owner_id
    static async getAllGroupsByOwnerId(owner_id) {
        const result = await pool.query("SELECT * FROM groups WHERE owner_id = $1", [owner_id])
        return result.rows.map(row => new Group(row));
    }

    // get a group by group_id
    static async getGroupById(group_id) {
        const result = await pool.query("SELECT * FROM groups WHERE group_id = $1", [group_id])
        return result.rows[0] ? new Group(result.rows[0]) : null;
    }

    // delete a group
    static async deleteGroup(group_id) {
        const result = await pool.query("DELETE FROM groups WHERE group_id = $1 RETURNING *", [group_id])
        return result.rows[0] ? new Group(result.rows[0]) : null;
    }

    // generate a code
    async generateCode() {
        const listOfChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += listOfChars[this.getRandomInt(0, listOfChars.length - 1)];
        }
        return code;
    }

    // get a random integer
    async getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}