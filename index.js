const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Make App
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
    if (!req.headers.auth) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = req.headers.auth.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' });
        }
        req.decoded = decoded;
        next();
    });
}

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
        app.post('/get-token', async (req, res) => {
            const token = jwt.sign(req.body, process.env.ACCESS_TOKEN, {
                expiresIn: '1d'
            });
            res.send({ token });
        });

        // Get Api
        app.get('/inventory', async (req, res) => {
            const cursor = inventoryCollection.find({});
            const result = await cursor.limit(6).toArray();
            res.send(result);
        });
        app.get('/inventories', async (req, res) => {
            const cursor = inventoryCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get('/inventory/:id', async (req, res) => {
            const { id } = req.params;
            const result = await inventoryCollection.findOne(ObjectId(id));
            res.send(result);
        });
        app.get('/my-items', verifyJWT, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const { email } = req.query;
            if (decodedEmail === email) {
                const cursor = inventoryCollection.find({ email });
                const result = await cursor.toArray();
                res.send(result);
            } else {
                res.status(403).send({ message: 'forbidden access' });
            }
        });

        // Update Api
        app.put('/inventory/:id', async (req, res) => {
            const { id } = req.params;
            const options = { upsert: true };
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: req.body
            };
            const result = await inventoryCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // Delete Api
        app.delete('/inventory/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: ObjectId(id) };
            const result = await inventoryCollection.deleteOne(query);
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