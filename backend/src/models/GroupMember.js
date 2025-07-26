const pool = require("../config/database");

class GroupMembers {
    constructor({group_id, user_id, role}) {
        this.group_id = group_id;
        this.user_id = user_id;
        this.role = role;
    }


    // add a member to a group
    static async addMemberToGroup(group_id, user_id, role) {
        const result = await pool.query("INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3) RETURNING *", [group_id, user_id, role])
        return result.rows[0] ? new GroupMembers(result.rows[0]) : null;
    }

    // get all members of a group
    static async getAllMemberOfTheGroup(group_id) {
        const result = await pool.query("SELECT * FROM group_members WHERE group_id = $1", [group_id])
        return result.rows.map(row => new GroupMembers(row));
    }

    //verify if the user is a member of the group
    static async verifyUser(group_id, user_id) {
        const result = await pool.query("SELECT * FROM group_members WHERE user_id = $1 AND group_id = $2", [user_id, group_id])
        return result.rows[0] ? true : false;
    }

    // delete a member from a group
    static async deleteMemberFromGroup(group_id, user_id) {
        const result = await pool.query("DELETE FROM group_members WHERE group_id = $1 AND user_id = $2 RETURNING *", [group_id, user_id])
        return result.rows[0] ? new GroupMembers(result.rows[0]) : null;
    }
}