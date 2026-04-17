const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create MySQL connection without specifying DB to create it if it doesn't exist
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Siddharth@18122015'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server.');

    // Create database if not exists
    db.query("CREATE DATABASE IF NOT EXISTS eventdb", (err, result) => {
        if (err) throw err;
        console.log("Database eventdb verified/created.");

        // Switch to the created database
        db.changeUser({ database: 'eventdb' }, (err) => {
            if (err) throw err;

            // Create table if not exists
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS registrations (
                    regno VARCHAR(20) PRIMARY KEY,
                    name VARCHAR(100),
                    events TEXT
                )
            `;
            db.query(createTableQuery, (err, result) => {
                if (err) throw err;
                console.log("Table registrations verified/created.");
            });
        });
    });
});

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
app.post('/submit', (req, res) => {
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

    const eventsStr = events.join(', ');

    const sql = "INSERT INTO registrations (regno, name, events) VALUES (?, ?, ?)";
    db.query(sql, [regno, name, eventsStr], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send(renderMessage('Duplicate Entry', `Register number ${regno} is already registered.`, true));
            }
            console.error(err);
            return res.status(500).send(renderMessage('Server Error', 'An error occurred while saving your registration.', true));
        }
        res.send(renderMessage('Registration Successful!', `Thank you ${name}. You have registered for: ${eventsStr}`, false));
    });
});

// GET Endpoint for admin search
app.get('/api/admin/search', (req, res) => {
    const { regno } = req.query;

    if (!regno) {
        return res.status(400).json({ error: 'Register Number is required' });
    }

    const sql = "SELECT * FROM registrations WHERE regno = ?";
    db.query(sql, [regno], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error occurred' });
        }
        
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Register number not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
