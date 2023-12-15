require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

mongoose.connect(process.env.DB_URI)
   .then(() => {
      console.log("DB connection successful.");
   })
   .catch((err) => {
      console.log(`DB connection error:${err}`);
   });

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;