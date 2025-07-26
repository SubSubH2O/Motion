const pool = require("../config/database");

class TextNote {
    constructor({note_id, content}) {
        this.note_id = note_id;
        this.content = content;
    }

    // create a text note
    static async createTextNote({note_id, content}) {
        const result = await pool.query("INSERT INTO text_notes (note_id, content) VALUES ($1, $2) RETURNING *", [note_id, content])
        return result.rows.length > 0 ? new TextNote(result.rows[0]) : null;
    }

    // edit a text note
    static async editTextNote({note_id, content}) {
        const result = await pool.query("UPDATE text_notes SET content = $1 WHERE note_id = $2 RETURNING *", [content, note_id])
        return result.rows.length > 0 ? new TextNote(result.rows[0]) : null;
    }

    // delete a text note
    static async deleteTextNote({note_id}) {
        const result = await pool.query("DELETE FROM text_notes WHERE note_id = $1 RETURNING *", [note_id])
        return result.rows.length > 0 ? new TextNote(result.rows[0]) : null;
    }

    // get a text note by note_id
    static async getTextNoteByNoteId(note_id) {
        const result = await pool.query("SELECT * FROM text_notes WHERE note_id = $1", [note_id])
        return result.rows.length > 0 ? new TextNote(result.rows[0]) : null;
    }
}