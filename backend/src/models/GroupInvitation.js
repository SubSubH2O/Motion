const pool = require("../config/database");
const { INVITATION_STATUS } = require("../utils/constants");

class GroupInvitation {
    constructor({invitation_id = null, group_id, sender_id, receiver_id, code_used, status}) {
        this.invitation_id = invitation_id;
        this.group_id = group_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.code_used = code_used;
        this.status = status;
    }

    // TODO: do i need to have a function that do something about the code_used?

    // user accept the invitation
    static async acceptInvitation(invitation_id) {
        const result = await pool.query("UPDATE group_invitations SET status = $1 WHERE invitation_id = $2 AND status = $3", [INVITATION_STATUS.ACCEPTED, invitation_id, INVITATION_STATUS.PENDING])
        return result.rows[0] ? new GroupInvitation(result.rows[0]) : null;
    }

    // user reject the invitation
    static async acceptInvitation(invitation_id) {
        const result = await pool.query("UPDATE group_invitations SET status = $1 WHERE invitation_id = $2 AND status = $3", [INVITATION_STATUS.REJECTED, invitation_id, INVITATION_STATUS.PENDING])
        return result.rows[0] ? new GroupInvitation(result.rows[0]) : null;
    }

    // create a new invitation
    static async createInvitation(group_id, sender_id, receiver_id) {
        const result = await pool.query("INSERT INTO group_invitations (group_id, sender_id, receiver_id) VALUES ($1, $2, $3) RETURNING *", [group_id, sender_id, receiver_id])
        return result.rows[0] ? new GroupInvitation(result.rows[0]) : null;
    }

    // get the invitation by sender_id
    static async getInvitationBySenderId(sender_id) {
        const result = await pool.query("SELECT * FROM group_invitations WHERE sender_id = $1", [sender_id])
        return result.rows[0] ? new GroupInvitation(result.rows[0]) : null;
    }

    // get the invitation by receiver_id
    static async getInvitationByReceiverId(receiver_id) {
        const result = await pool.query("SELECT * FROM group_invitations WHERE receiver_id = $1", [receiver_id])
        return result.rows[0] ? new GroupInvitation(result.rows[0]) : null;
    }

    // get the invitation by group_id
    static async getInvitationByGroupId(group_id) {
        const result = await pool.query("SELECT * FROM group_invitations WHERE group_id = $1", [group_id])
        return result.rows.map(row => new GroupInvitation(row));
    }

    // get the invitation by status
    static async getInvitationByStatus(status) {
        const result = await pool.query("SELECT * FROM group_invitations WHERE status = $1", [status])
        return result.rows.map(row => new GroupInvitation(row));
    }
}