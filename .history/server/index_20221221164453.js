const express = require('express');
const cors = require('cors');
const app = express();

const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost", 
    user: "root",
    password: "D0rAvantGard3!",
    database: "cruddatabase",
});

app.use(cors());

app.post('/api/insert/', (req, res) => {
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});