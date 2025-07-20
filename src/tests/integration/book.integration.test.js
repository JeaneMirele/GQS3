const request = require('supertest');
const app = require('../../app');
const pool = require('../../database/db'); 

describe('BookController - Integração', () => {
  let authorId;
  let bookId;

  beforeAll(async () => {
    const result = await pool.query("INSERT INTO autores (nome) VALUES ($1) RETURNING *", ['Autor Teste']);
    console.log('Autor criado:', result.rows[0]); 
    authorId = result.rows[0].id;
  });

  afterAll(async () => {
        await pool.query('DELETE FROM livros');
        await pool.query('DELETE FROM autores');
        await pool.end(); 
  });


  test('POST /book - deve criar um novo livro', async () => {
    const res = await request(app)
      .post('/book')
      .send({ titulo: 'Livro de Teste', author_id: authorId });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Livro de Teste');
    bookId = res.body.id; 
  });

  test('GET /book - deve retornar todos os livros', async () => {
    const res = await request(app).get('/book');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /book/:id - deve retornar o livro pelo ID', async () => {
    const res = await request(app).get(`/book/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(bookId);
  });

  test('PUT /book/:id - deve atualizar um livro', async () => {
    const res = await request(app)
      .put(`/book/${bookId}`)
      .send({ titulo: 'Livro Atualizado', author_id: authorId });

    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Livro Atualizado');
  });

  test('DELETE /book/:id - deve deletar um livro', async () => {
    const res = await request(app).delete(`/book/${bookId}`);
    expect(res.statusCode).toBe(204);
  });

  test('GET /book/:id - deve retornar 404 se não existir', async () => {
    const res = await request(app).get(`/book/${bookId}`);
    expect(res.statusCode).toBe(404);
  });
});


