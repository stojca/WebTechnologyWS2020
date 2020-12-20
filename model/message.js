class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS messages (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              new_message TEXT[],
              session_name TEXT)`
        return this.dao.run(sql)
    }

    create(new_message, session_name) {
        return this.dao.run(
            'INSERT INTO messages (new_message, session_name) VALUES (?,?)',
            [new_message, session_name])
    }

    update(project) {
        const { id, new_message } = project
        return this.dao.run(
            `UPDATE messages SET new_message = ? WHERE id = ?`,
            [new_message, id]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM messages WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM messages WHERE id = ?`,
            [id])
    }

    getAll() {
        return this.dao.all(`SELECT * FROM messages`)
    }

    getChatsBySessionName(session_name)
    {
        return this.dao.all(`SELECT new_message FROM messages where session_name = ?`,
            [session_name])
    }
}

module.exports = MessageRepository;