const express = require('express');
const app = express();

const mysql = require('mysql');
const db = mysql.createPool({
    host: "localhost", 
    user: "root",
    password: "D0rAvantGard3!",
    database: "CRUDDataBase",
});

app.get("/", (req,res) => {
    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('Harry Potter 1' , 'epic movie.');"
    
    db.query(sqlInsert, (err, result) => { 
        res.send('hello dor'); 
    });

})

app.listen(3001, () => {
    console.log("running on port 3001");
});