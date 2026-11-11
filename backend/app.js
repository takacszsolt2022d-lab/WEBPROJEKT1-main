/*
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
*/
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import  'dotenv/config';
import cors from 'cors';

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import termekekRouter from './routes/termekek.js';

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/termekek', termekekRouter);

export default app;
