const express = require('express');
const path = require('path');
const bookRoutes = require('./routes/BookRoutes');
const authorRoutes = require('./routes/AuthorRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/book', bookRoutes); 
app.use('/author', authorRoutes);
module.exports = app; 

