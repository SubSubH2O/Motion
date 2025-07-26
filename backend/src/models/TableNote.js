const pool = require("../config/database");

class TableNote {
    constructor({note_id, content, row_count, col_count}) {
        this.note_id = note_id;
        this.content = content;
        this.row_count = row_count;
        this.col_count = col_count;
    }

    // create a table note
    static async createTableNote({note_id, content, row_count, col_count}) {
        const result = await pool.query("INSERT INTO table_notes (note_id, content, row_count, col_count) VALUES ($1, $2, $3, $4) RETURNING *", [note_id, content, row_count, col_count])
        return result.rows.length > 0 ? new TableNote(result.rows[0]) : null;
    }

    // edit a table note
    static async editTableNote({note_id, content, row_count, col_count}) {
        const result = await pool.query("UPDATE table_notes SET content = $1, row_count = $2, col_count = $3 WHERE note_id = $4 RETURNING *", [content, row_count, col_count, note_id])
        return result.rows.length > 0 ? new TableNote(result.rows[0]) : null;
    }

    // delete a table note
    static async deleteTableNote({note_id}) {
        const result = await pool.query("DELETE FROM table_notes WHERE note_id = $1 RETURNING *", [note_id])
        return result.rows.length > 0 ? new TableNote(result.rows[0]) : null;
    }

    // get a table note by note_id
    static async getTableNoteByNoteId(note_id) {
        const result = await pool.query("SELECT * FROM table_notes WHERE note_id = $1", [note_id])
        return result.rows.length > 0 ? new TableNote(result.rows[0]) : null;
    }
}