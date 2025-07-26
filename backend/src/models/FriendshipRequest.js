const pool = require("../config/database")
const { FRIENDSHIP_STATUS } = require("../utils/constants")

class FriendshipRequest {
    constructor({ request_id, sender_id, receiver_id, status }) {
        if (!Object.values(FRIENDSHIP_STATUS).includes(status)) {
            throw new Error(`Invalid friendship status: ${status}`);
        }
        this.request_id = request_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.status = status;
    }

    // Create a friendship request
    static async createFriendshipRequest(sender_id, receiver_id) {
        const result = await pool.query(
            "INSERT INTO friendship_requests (sender_id, receiver_id, status) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *",
            [sender_id, receiver_id, 'pending']
        );
        return result.rows[0] ? new FriendshipRequest(result.rows[0]) : null;
    }

    // Delete a friendship request
    static async deleteFriendshipRequest(sender_id, receiver_id) {
        const result = await pool.query(
            "DELETE FROM friendship_requests WHERE sender_id = $1 AND receiver_id = $2 RETURNING *",
            [sender_id, receiver_id]
        );
        return result.rows[0] ? new FriendshipRequest(result.rows[0]) : null;
    }

    // Get friendship request by id
    static async getFriendshipRequestById(request_id) {
        const result = await pool.query("SELECT * FROM friendship_requests WHERE request_id = $1", [request_id]);
        return result.rows[0] ? new FriendshipRequest(result.rows[0]) : null;
    }

    // Get all friendship requests received by a user
    static async getAllFriendshipRequestsForUser(receiver_id) {
        const result = await pool.query(
            "SELECT * FROM friendship_requests WHERE receiver_id = $1",
            [receiver_id]
        );
        return result.rows.map(row => new FriendshipRequest(row));
    }

    // Get all friendship requests sent by a user
    static async getAllSentFriendshipRequests(sender_id) {
        const result = await pool.query(
            "SELECT * FROM friendship_requests WHERE sender_id = $1",
            [sender_id]
        );
        return result.rows.map(row => new FriendshipRequest(row));
    }

    // Update request status
    static async updateRequestStatus(request_id, status) {
        const result = await pool.query(
            "UPDATE friendship_requests SET status = $1 WHERE request_id = $2 RETURNING *",
            [status, request_id]
        );
        return result.rows[0] ? new FriendshipRequest(result.rows[0]) : null;
    }
}

module.exports = FriendshipRequest;