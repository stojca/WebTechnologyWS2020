class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS messages (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              new_message TEXT[],
              session_name TEXT,
              image_reference TEXT)`
        return this.dao.run(sql)
    }

    create(new_message, session_name, image_reference) {
        return this.dao.run(
            'INSERT INTO messages (new_message, session_name, image_reference) VALUES (?,?,?)',
            [new_message, session_name, image_reference])
    }

    //not used
    update(project) {
        const { id, new_message } = project
        return this.dao.run(
            `UPDATE messages SET new_message = ? WHERE id = ?`,
            [new_message, id]
        )
    }

    //not used
    delete(id) {
        return this.dao.run(
            `DELETE FROM messages WHERE id = ?`,
            [id]
        )
    }

    getChatsBySessionName(session_name) {
        return this.dao.get(
            `SELECT * FROM messages WHERE session_name = ?`,
            [session_name])
    }

    //not used
    getAll() {
        return this.dao.all(`SELECT * FROM messages`)
    }

}

module.exports = MessageRepository;