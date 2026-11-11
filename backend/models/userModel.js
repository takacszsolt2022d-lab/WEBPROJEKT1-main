import pool from '../config/db.js';

const UserModel = {
  // Összes felhasználó lekérése az adatbázisból
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },

    // Felhasználó lekérése ID alapján
    async getById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

    // Új felhasználó hozzáadása
    async create(user) {
    const {email, password, name, phone, profileimage } = user;
    const [result] = await pool.query('INSERT INTO users ( email, password, name, phone, profileimage) VALUES (?, ?, ?, ?, ?)', [email, password, name, phone, profileimage]);
    return { id: result.insertId, ...user };
  },

    // Felhasználó lekérése email alapján
    async getByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];    
  },

    // lastlogin frissítése
    async updateLastLogin(id) {
    const [result] = await pool.query('UPDATE users SET lastlogin = NOW() WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

}

export default UserModel;