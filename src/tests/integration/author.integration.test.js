const request = require('supertest');
const app = require('../../app');
const pool = require('../../database/db'); 

describe('AuthorController - Integração', () => {
  let authorId;

  beforeEach(async () => {
    await pool.query('DELETE FROM autores');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('POST /author - deve criar um autor', async () => {
    const res = await request(app)
      .post('/author')
      .send({ name: 'Cecília Meireles' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Cecília Meireles');

    authorId = res.body.id;
  });

  test('GET /author - deve retornar todos os autores', async () => {
   
    await pool.query("INSERT INTO autores (nome) VALUES ($1)", ['Carlos Drummond']);

    const res = await request(app).get('/author');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Carlos Drummond');
  });

  test('GET /author/:id - deve retornar autor por ID', async () => {
    const insert = await pool.query("INSERT INTO autores (nome) VALUES ($1) RETURNING *", ['Lima Barreto']);
    const id = insert.rows[0].id;

    const res = await request(app).get(`/author/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Lima Barreto');
  });

  test('PUT /author/:id - deve atualizar nome do autor', async () => {
    const insert = await pool.query("INSERT INTO autores (nome) VALUES ($1) RETURNING *", ['Monteiro Lobato']);
    const id = insert.rows[0].id;

    const res = await request(app)
      .put(`/author/${id}`)
      .send({ name: 'Monteiro Lobato Atualizado' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Monteiro Lobato Atualizado');
  });

  test('DELETE /author/:id - deve deletar o autor', async () => {
    const insert = await pool.query("INSERT INTO autores (nome) VALUES ($1) RETURNING *", ['Euclides da Cunha']);
    const id = insert.rows[0].id;

    const res = await request(app).delete(`/author/${id}`);
    expect(res.statusCode).toBe(204);
  });

  test('GET /author/:id - deve retornar 404 se autor não existir', async () => {
    const res = await request(app).get('/author/99999');
    expect(res.statusCode).toBe(404);
  });
});
