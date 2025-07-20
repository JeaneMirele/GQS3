process.env.NODE_ENV = 'test'; 
const { defineConfig } = require("cypress");
const pool = require('./src/database/db');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {  
        async seedDatabase() {
        
          await pool.query('TRUNCATE TABLE autores RESTART IDENTITY CASCADE');
          await pool.query('TRUNCATE TABLE livros RESTART IDENTITY CASCADE');

          await pool.query(
            'INSERT INTO autores (nome) VALUES ($1);',
            ["Machado De Assis"]
          );
          
          await pool.query(
            'INSERT INTO autores (nome) VALUES ($1);',
            ["José De Alencar"]
          );

          await pool.query(
            'INSERT INTO autores (nome) VALUES ($1);',
            ["Clarisse Lispector"]
          );
     
          return null;
        }
      }); 
      config.env.DB_USER = process.env.DB_USER;
      config.env.DB_NAME = process.env.DB_NAME;
    },
  },
});
