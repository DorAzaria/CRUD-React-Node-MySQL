const express = require('express');
const cors = require('cors');
const app = express();

const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost", 
    user: "root",
    password: "password",
    database: "CRUDDataBase",
});

app.use(cors());

app.get("/", (req,res) => {
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('harry potter' , 'epic movie');";
    
    db.query(sqlInsert, (err, result) => { 
        res.send('hello dor'); 
    });
    
})

app.listen(3001, () => {
    console.log("running on port 3001");
});