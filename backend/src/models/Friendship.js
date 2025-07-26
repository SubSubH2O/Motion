const pool = require("../config/database")

class Friendship {
    constructor({ friendship_id, user_id, friend_id }) {
        this.friendship_id = friendship_id;
        this.user_id = user_id;
        this.friend_id = friend_id;
    }

    // create a friendship
    static async createFriendship(user_id, friend_id) {
        const [uid1, uid2] = user_id < friend_id ? [user_id, friend_id] : [friend_id, user_id];
        const result = await pool.query(
            "INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *",
            [uid1, uid2]
        );
        return result.rows[0] ? new Friendship(result.rows[0]) : null;
    }

    // Delete a friendship (regardless of direction)
    static async deleteFriendship(user_id, friend_id) {
        const [uid1, uid2] = user_id < friend_id ? [user_id, friend_id] : [friend_id, user_id];
        const result = await pool.query(
            "DELETE FROM friendships WHERE user_id = $1 AND friend_id = $2 RETURNING *",
            [uid1, uid2]
        );
        return result.rows[0] ? new Friendship(result.rows[0]) : null;
    }

    // Get friendship by id
    static async getFriendshipById(friendship_id) {
        const result = await pool.query("SELECT * FROM friendships WHERE friendship_id = $1", [friendship_id]);
        return result.rows[0] ? new Friendship(result.rows[0]) : null;
    }

    // Get all friendships for a user (returns all Friendship objects where user is involved)
    static async getAllFriendshipByUserId(user_id) {
        const result = await pool.query(
            "SELECT * FROM friendships WHERE user_id = $1 OR friend_id = $1",
            [user_id]
        );
        return result.rows.map(row => new Friendship(row));
    }

    // Check if two users are friends
    static async areFriends(user_id, friend_id) {
        const [uid1, uid2] = user_id < friend_id ? [user_id, friend_id] : [friend_id, user_id];
        const result = await pool.query(
            "SELECT * FROM friendships WHERE user_id = $1 AND friend_id = $2",
            [uid1, uid2]
        );
        return result.rows.length > 0;
    }
}