import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserController = {
    // Összes felhasználó lekérése
    async getAll(req, res) {
        try {
            const users = await userModel.getAll(); 
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Felhasználó lekérése ID alapján
    async getById(req, res) {
        const { id } = req.params;
        try {
            const user = await userModel.getById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'Nincs ilyen felhasználó' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Új felhasználó hozzáadása
    async create(req, res) {
        const { email, password, name, phone, profileimage } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Jelszó hash-elése
        try {
            const newUser = await userModel.create({ email, password: hashedPassword, name, phone, profileimage });
            res.status(201).json(newUser);
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ error: 'Ez az email cím már létezik' });
                return;
            }
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Login
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userModel.getByEmail(email);
            if (!user) {
                res.status(404).json({ error: 'Nincs ilyen felhasználó' });
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ error: 'Hibás jelszó' });
                return;
            }
            await userModel.updateLastLogin(user.id); // lastlogin frissítése

            const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // Csak a szerver férhet hozzá, nem a kliens oldali JavaScript
                secure: false, // Csak HTTPS-en keresztül küldhető
                sameSite: 'Strict', // CSRF elleni védelem (Cross-Site Request Forgery)
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 nap
            });

            res.json({ message: 'Sikeres bejelentkezés', accessToken});
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: 'Nincs frissítő token' });
        }
        
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Érvénytelen frissítő token' });
            }
          const newAccessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' });
        res.json({ accessToken: newAccessToken });
        });
    },
    async logout(req, res) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        });
        res.json({ message: 'Sikeres kijelentkezés' });
    },

    async test(req, res) {
        res.json({ message: 'Test endpoint is working!' });
    }
}

export default UserController;