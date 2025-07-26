const pool = require("../config/database");

class Note {
    constructor({note_id = null, owner_id, group_id, title, type}) {
        this.note_id = note_id;
        this.owner_id = owner_id;
        this.group_id = group_id;
        this.title = title;
        this.type = type;
    }

    // create
    static async createNote({ owner_id, group_id = null, title, type}) {
        const result = await pool.query("INSERT INTO notes (owner_id, group_id, title, type) VALUES ($1, $2, $3, $4) RETURNING *", [owner_id, group_id, title, type])
        return result.rows[0] ? new Note(result.rows[0]) : null;
    }

    // TODO: there is more type of note, table all that thing, implement the logic for that later
    // edit
    static async editNote({content, note_id, owner_id}) {
        const result = await pool.query("UPDATE notes SET content = $1 WHERE note_id = $2 AND owner_id = $3 RETURNING *", [content, note_id, owner_id])
        return result.rows[0]  ? new Note(result.rows[0]) : null;
    }

    // delete
    static async deleteNote({note_id, owner_id}) {
        const result = await pool.query("DELETE FROM notes WHERE note_id = $1 AND owner_id = $2 RETURNING *", [note_id, owner_id])
        return result.rows[0] ? new Note(result.rows[0]) : null;
    }

    // get note by Id
    static async getNoteById({note_id, owner_id}) {
        const result = await pool.query("SELECT * FROM notes WHERE note_id = $1 AND owner_id = $2", [note_id, owner_id])
        return result.rows[0] ? new Note(result.rows[0]) : null;
    }

    // get all notes by owner_id
    static async getAllNoteByOwnerId({owner_id}) {
        const result = await pool.query("SELECT * FROM notes WHERE owner_id = $1", [owner_id])
        return result.rows.map(row => new Note(row));
    }

    // get all notes by group_id
    static async getAllNoteByGroupId({group_id}) {
        const result = await pool.query("SELECT * FROM notes WHERE group_id = $1", [group_id])
        return result.rows.map(row => new Note(row));
    }

    // get all notes by type
    static async getAllNoteByType({type}) {
        const result = await pool.query("SELECT * FROM notes WHERE type = $1", [type])
        return result.rows.map(row => new Note(row));
    }

    // get all notes by type and owner_id
    static async getAllNoteByTypeAndOwnerId({type, owner_id}) {
        const result = await pool.query("SELECT * FROM notes WHERE type = $1 AND owner_id = $2", [type, owner_id])
        return result.rows.map(row => new Note(row));
    }

    // get all notes by type and group_id
    static async getAllNoteByTypeAndGroupId({type, group_id}) {
        const result = await pool.query("SELECT * FROM notes WHERE type = $1 AND group_id = $2", [type, group_id])
        return result.rows.map(row => new Note(row));
    }
}