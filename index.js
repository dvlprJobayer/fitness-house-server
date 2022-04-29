const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// Make App
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());

// Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4ueyb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db("inventoryDB").collection("inventories");

        // Post Api
        app.post('/add-item', async (req, res) => {
            const result = await inventoryCollection.insertOne(req.body);
            res.send(result);
        });

        // Get Api
        app.get('/inventory', async (req, res) => {
            const cursor = inventoryCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(console.dir);

// Test Api
app.get('/', (req, res) => {
    res.send('Running fitness house server');
});

// Listen App
app.listen(port, () => {
    console.log('Running server on', port);
});