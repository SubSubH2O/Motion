const pool = require("../config/database");
const { NOTE_HISTORY_ACTION } = require("../utils/constants");

class NoteHistory {
    constructor({history_id = null, user_id, note_id, user_name, note_title, action, changes}) {
        this.history_id = history_id;
        this.user_id = user_id;
        this.note_id = note_id;
        this.user_name = user_name;
        this.note_title = note_title;
        this.action = action;
        this.changes = changes;
    }

    static async createNoteHistory({user_id, note_id, user_name, note_title, action, changes}) {
        if (!Object.values(NOTE_HISTORY_ACTION).includes(action)) {
            throw new Error("Invalid action");
        }
        const result = await pool.query("INSERT INTO note_history (user_id, note_id, user_name, note_title, action, changes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, note_id, user_name, note_title, action, changes])
        return result.rows.length > 0 ? new NoteHistory(result.rows[0]) : null;
    }

    static async deleteNoteHistory(history_id) {
        const result = await pool.query("DELETE FROM note_history WHERE history_id = $1 RETURNING *", [history_id])
        return result.rows.length > 0 ? new NoteHistory(result.rows[0]) : null;
    }

    static async getAllNoteHistoryByNoteId(note_id) {
        const result = await pool.query("SELECT * FROM note_history WHERE note_id = $1", [note_id])
        return result.rows.map(row => new NoteHistory(row));
    }

    static async getAllNoteHistoryByUserId(user_id) {
        const result = await pool.query("SELECT * FROM note_history WHERE user_id = $1", [user_id])
        return result.rows.map(row => new NoteHistory(row));
    }

    static async getAllNoteHistoryByUserIdAndNoteId(user_id, note_id) {
        const result = await pool.query("SELECT * FROM note_history WHERE user_id = $1 AND note_id = $2", [user_id, note_id])
        return result.rows.map(row => new NoteHistory(row));
    }

    static async getAllNoteHistoryByUserIdAndNoteIdAndAction(user_id, note_id, action) {
        if (!Object.values(NOTE_HISTORY_ACTION).includes(action)) {
            throw new Error("Invalid action");
        }
        const result = await pool.query("SELECT * FROM note_history WHERE user_id = $1 AND note_id = $2 AND action = $3", [user_id, note_id, action])
        return result.rows.map(row => new NoteHistory(row));
    }

    // 
}

// action has 3 types: create, edit, delete