require('dotenv').config();

const express = require('express');
const db = require('./db/config');
const cors = require('cors');

const app = express();
app.use(cors());

db.connect();

app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Hola mundo'
    });
})

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en puerto ${port}`);
});