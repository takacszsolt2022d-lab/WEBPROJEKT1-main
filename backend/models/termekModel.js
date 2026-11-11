import pool from '../config/db.js';

const TermekModel = {
  // Összes termék lekérése az adatbázisból
    async getAll() {
    const [rows] = await pool.query('SELECT * FROM termekek');
    return rows;
  },

  // Termék lekérése ID alapján
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM termekek WHERE id = ?', [id]);
    return rows[0];
  },

  // Új termék hozzáadása
  async create(termek) {
    const { nev, ar, keszlet } = termek;
    const [result] = await pool.query('INSERT INTO termekek (nev, ar, keszlet) VALUES (?, ?, ?)', [nev, ar, keszlet]);
    return { id: result.insertId, ...termek };
  }

};

export default TermekModel;