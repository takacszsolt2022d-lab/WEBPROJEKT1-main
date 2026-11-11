//var express = require('express');
import express from 'express';
import userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authJWT.js';
var router = express.Router();

//app.js prefix: /users
router.get('/', userController.getAll); // Összes felhasználó lekérése
router.get('/test', authenticateToken, userController.test); // Test endpoint
router.post('/refresh-token', userController.refreshToken); // Refresh token endpoint
router.post('/logout', userController.logout); // Logout endpoint
router.get('/:id', userController.getById); // Felhasználó lekérése ID alapján

router.post('/', userController.create); // Új felhasználó hozzáadása
router.post('/login', userController.login); // Login


export default router;
