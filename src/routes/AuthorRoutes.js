const express = require('express');
const router = express.Router();
const authorController = require('../controllers/AuthorController');

router.post('/', (req, res) => authorController.createAuthor(req, res));
router.get('/new', (req, res) => authorController.renderNewAuthorForm(req, res));
router.get('/', (req, res) => authorController.getAllAuthors(req, res));
router.get('/:id', (req, res) => authorController.getAuthorById(req, res));
router.put('/:id', (req, res) => authorController.updateAuthor(req, res));
router.delete('/:id', (req, res) => authorController.deleteAuthor(req, res));

module.exports = router;
