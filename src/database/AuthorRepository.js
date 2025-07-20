const pool = require('./db');
const Author = require('../model/Author');

class AuthorRepository {
    async getAllAuthors() {
        const result = await pool.query('SELECT * FROM autores');
        return result.rows.map(row => new Author(row.id, row.nome));
    }

    async getAuthorById(id) {
        const result = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Author(row.id, row.nome);
    }

    async createAuthor(author) {
       const result = await pool.query(
            'INSERT INTO autores (nome) VALUES ($1) RETURNING *',
            [author.name]
        );
        const row = result.rows[0];
        return new Author(row.id, row.nome);
    }

    async updateAuthor(id, author) {
        const result = await pool.query(
            'UPDATE autores SET nome = $1 WHERE id = $2 RETURNING *',
            [author.name, id]
        );
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Author(row.id, row.nome);
    }

    async deleteAuthor(id) {
        const result = await pool.query('DELETE FROM autores WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0;
    }
}
module.exports = new AuthorRepository();