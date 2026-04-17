const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'eventdb';
let db;
let registrationsCollection;

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        db = client.db(dbName);
        registrationsCollection = db.collection('registrations');
        
        // Create a unique index on regno to prevent duplicates
        await registrationsCollection.createIndex({ regno: 1 }, { unique: true });
        console.log('Unique index on regno ensured.');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

connectToMongo();

// Helper function to format errors and successes into nice HTML
const renderMessage = (title, message, isError) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div class="glass-container status-message ${isError ? 'error-container' : 'success-container'}">
        <h1>${title}</h1>
        <p>${message}</p>
        <a href="/" class="btn">Go Back</a>
    </div>
</body>
</html>
`;


// POST Endpoint for submitting registration
app.post('/submit', async (req, res) => {
    const { regno, name } = req.body;
    let events = req.body.events;

    // Normalize events to an array if it's a single string or undefined
    if (!events) {
        events = [];
    } else if (typeof events === 'string') {
        events = [events];
    }

    // Validation
    if (events.length > 3) {
        return res.status(400).send(renderMessage('Validation Error', 'You can only select up to 3 events.', true));
    }
    if (events.length === 0) {
        return res.status(400).send(renderMessage('Validation Error', 'You must select at least 1 event.', true));
    }
    if (!regno || !name) {
        return res.status(400).send(renderMessage('Validation Error', 'Register Number and Name are required.', true));
    }

    try {
        // Document format specified: save events as a comma-separated string for easier direct DB viewing
        const doc = {
            regno,
            name,
            events: events.join(', ')
        };

        const result = await registrationsCollection.insertOne(doc);
        const eventsStr = events.join(', ');
        
        res.send(renderMessage('Registration Successful!', `Thank you ${name}. You have registered for: ${eventsStr}`, false));
    } catch (err) {
        // Handle duplicate key error code 11000
        if (err.code === 11000) {
            return res.status(409).send(renderMessage('Duplicate Entry', `Register number ${regno} is already registered.`, true));
        }
        console.error(err);
        return res.status(500).send(renderMessage('Server Error', 'An error occurred while saving your registration.', true));
    }
});

// GET Endpoint for admin search
app.get('/api/admin/search', async (req, res) => {
    const { regno } = req.query;

    if (!regno) {
        return res.status(400).json({ error: 'Register Number is required' });
    }

    try {
        const doc = await registrationsCollection.findOne({ regno });
        if (doc) {
            // Send back formatted data, handling both legacy arrays and new string format
            res.json({
                regno: doc.regno,
                name: doc.name,
                events: Array.isArray(doc.events) ? doc.events.join(', ') : doc.events
            });
        } else {
            res.status(404).json({ error: 'Register number not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
