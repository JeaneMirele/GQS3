const pool = require('./db');
const Book = require('../model/Book');

class BookRepository {
    async getAllBooks() {
        const result = await pool.query('SELECT * FROM livros');
        return result.rows.map(row => new Book(row.id, row.titulo, row.autor_id));
    }

    async getBookById(id) {
        const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Book(row.id, row.titulo, row.autor_id);
    }

    async createBook(bookData) {
        const result = await pool.query(
            'INSERT INTO livros (titulo, autor_id) VALUES ($1, $2) RETURNING *',
            [bookData.titulo, bookData.author_id]
        );
        const row = result.rows[0];
        return new Book(row.id, row.titulo, row.autor_id);
    }

    async updateBook(id, bookData) {
        const result = await pool.query(
            'UPDATE livros SET titulo = $1, autor_id = $2 WHERE id = $3 RETURNING *',
            [bookData.titulo, bookData.author_id, id]
        );
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Book(row.id, row.titulo, row.autor_id);
    }

    async deleteBook(id) {
        const result = await pool.query('DELETE FROM livros WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0;
    }
}
module.exports = new BookRepository();
