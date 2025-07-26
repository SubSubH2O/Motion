const pool = require("../config/database");

class ChecklistNote {
    constructor({note_id, content}) {
        this.note_id = note_id;
        this.content = content;
    }

    // create a checklist note
    static async createChecklistNote({note_id, content}) {
        const result = await pool.query("INSERT INTO checklist_notes (note_id, content) VALUES ($1, $2) RETURNING *", [note_id, content])
        return result.rows.length > 0 ? new ChecklistNote(result.rows[0]) : null;
    }

    // edit a checklist note
    static async editChecklistNote({note_id, content}) {
        const result = await pool.query("UPDATE checklist_notes SET content = $1 WHERE note_id = $2 RETURNING *", [content, note_id])
        return result.rows.length > 0 ? new ChecklistNote(result.rows[0]) : null;
    }

    // delete a checklist note
    static async deleteChecklistNote({note_id}) {
        const result = await pool.query("DELETE FROM checklist_notes WHERE note_id = $1 RETURNING *", [note_id])
        return result.rows.length > 0 ? new ChecklistNote(result.rows[0]) : null;
    }

    // get a checklist note by note_id
    static async getChecklistNoteByNoteId(note_id) {
        const result = await pool.query("SELECT * FROM checklist_notes WHERE note_id = $1", [note_id])
        return result.rows.length > 0 ? new ChecklistNote(result.rows[0]) : null;
    }
}