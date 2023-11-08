const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'creditsystem'
});

app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

app.post('/create', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const credit = req.body.credit
    const query = "INSERT INTO people (name, age, credit) VALUES (?,?,?)"
    db.query(query, [name, age, credit], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values Inserted")
        }
    })
});

app.get('/people', (req, res) => {
    const query = "SELECT * FROM people"
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});


app.listen(3001, () => {
    console.log('Server running on port 3001')
});