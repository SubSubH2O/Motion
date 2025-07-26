const pool = require("../config/database");
const { CHART_TYPE } = require("../utils/constants")

class ChartNote {
    constructor({note_id, content, chart_type}) {
        if (!Object.values(CHART_TYPE).includes(chart_type)) {
            throw new Error(`Invalid chart type: ${chart_type}`);
        }
        this.note_id = note_id;
        this.content = content;
        this.chart_type = chart_type;
    }

    // create a chart note
    static async createChartNote({note_id, content, chart_type}) {
        const result = await pool.query("INSERT INTO chart_notes (note_id, content, chart_type) VALUES ($1, $2, $3) RETURNING *", [note_id, content, chart_type])
        return result.rows.length > 0 ? new ChartNote(result.rows[0]) : null;
    }

    // edit a chart note
    static async editChartNote({note_id, content, chart_type}) {
        const result = await pool.query("UPDATE chart_notes SET content = $1, chart_type = $2 WHERE note_id = $3 RETURNING *", [content, chart_type, note_id])
        return result.rows.length > 0 ? new ChartNote(result.rows[0]) : null;
    }

    // delete a chart note
    static async deleteChartNote({note_id}) {
        const result = await pool.query("DELETE FROM chart_notes WHERE note_id = $1 RETURNING *", [note_id])
        return result.rows.length > 0 ? new ChartNote(result.rows[0]) : null;
    }

    // get a chart note by note_id
    static async getChartNoteByNoteId(note_id) {
        const result = await pool.query("SELECT * FROM chart_notes WHERE note_id = $1", [note_id])
        return result.rows.length > 0 ? new ChartNote(result.rows[0]) : null;
    }
}