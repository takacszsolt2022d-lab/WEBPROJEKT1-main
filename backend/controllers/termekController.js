import TermekModel from "../models/termekModel.js";

const TermekController = {
    // Összes termék lekérése
    async getAll(req, res) {
        try {
            const termekek = await TermekModel.getAll();
            res.json(termekek);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hiba történt a termékek lekérése során.' });
        }   
    },

    // Termék lekérése ID alapján
    async getById(req, res) {
        const { id } = req.params;
        try {
            const termek = await TermekModel.getById(id);
            if (termek) {
                res.json(termek);
            } else {
                res.status(404).json({ error: 'Termék nem található.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hiba történt a termék lekérése során.' });
        }
    },

    // Új termék hozzáadása
    async create(req, res) {
        try {
            if (!req.body.nev || !req.body.ar || !req.body.keszlet) {
                return res.status(400).json({ error: 'Hiányzó mezők: nev, ar, keszlet szükségesek.' });
            }
            const termek = await TermekModel.create(req.body);
            res.status(201).json(termek);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hiba történt a termék létrehozása során.' });
        }
    }   

};

export default TermekController;