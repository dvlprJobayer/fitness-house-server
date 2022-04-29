const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Make App
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());


// Test Api
app.get('/', (req, res) => {
    res.send('Running fitness house server');
});

// Listen App
app.listen(port, () => {
    console.log('Running server on', port);
});