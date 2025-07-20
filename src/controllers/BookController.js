const authorRepo = require('../database/authorRepository');
const bookRepo = require('../database/Book.Repository');


class BookController{
    
    async getAllBooks(req, res) {
        try {
            const books = await bookRepo.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: 'Falhou' });
        }
    }

    async getBookById(req, res) {
        const { id } = req.params;
        try {
            const book = await bookRepo.getBookById(id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed' });
        }
    }

    async createBook(req, res) {
        try {
            const newBook = await bookRepo.createBook(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create' });
        }
    }

    async updateBook(req, res) {
        const { id } = req.params;
        try {
            const updatedBook = await bookRepo.updateBook(id, req.body);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update book' });
        }
    }

    async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const result = await bookRepo.deleteBook(id);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete book' });
        }
    }
    async renderFormNewBook(req, res) {
        try {
            const authors = await authorRepo.getAllAuthors(); 
            res.render('new-book', { authors }); 
        } catch (error) {
            console.error('Erro ao carregar o formulário de novo livro:', error);
            res.status(500).send('Erro ao carregar o formulário');
        }
    }
}

module.exports = new BookController(); 