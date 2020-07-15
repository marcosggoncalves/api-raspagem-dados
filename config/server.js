const express = require('express');
const cors = require('cors')
const app = express();


app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

const comil = require('../app/routes/comilRoutes.js');

// Carregamanto de rotas.
app.use('/comil', comil);

module.exports = app;