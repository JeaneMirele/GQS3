const authorRepo = require('../database/authorRepository');
const Author = require('../model/Author');
class AuthorController {
   
    async getAllAuthors(req, res) {
        try {
            const authors = await authorRepo.getAllAuthors();
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch authors' });
        }
    }

    async getAuthorById(req, res) {
        const { id } = req.params;
        try {
            const author = await authorRepo.getAuthorById(id);
            if (author) {
                res.status(200).json(author);
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch author' });
        }
    }

    async createAuthor(req, res) {
        const { name } = req.body;
        try {
            const author = new Author(null, name);
            const newAuthor = await authorRepo.createAuthor(author);
            res.status(201).json(newAuthor);
        } catch (error) {
            res.status(500).json({ error: error});
        }
    }

    async updateAuthor(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updatedAuthor = await authorRepo.updateAuthor(id, req.body);
            if (updatedAuthor) {
                res.status(200).json(updatedAuthor);
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update author' });
        }
    }

    async deleteAuthor(req, res) {
        const { id } = req.params;
        try {
            const result = await authorRepo.deleteAuthor(id);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete author' });
        }
    }
    
    async renderNewAuthorForm(req, res) {
    res.render('new-author');
    }
}

module.exports = new AuthorController(); 